"use client";

import { useEffect, useState } from "react";
import { register } from "@teamhanko/hanko-elements";
import LogoutBtn from "@/components/LogoutButton";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreateApiKey } from "@/components/createApiKey";
import { useUserData } from "@/hooks/useUserdata";
import { FaChevronDown, FaChevronUp, FaKey, FaListAlt, FaUser } from "react-icons/fa";

const hankoApi = process.env.NEXT_PUBLIC_HANKO_API_URL;

interface ApiKey {
  id: string;
  value: string;
}

interface LogEntry {
  req_id: string;
  request_data: {
    data: any;
    format: string;
  };
  response_data: any;
  timestamp: string;
  type: string;
}

function HankoProfile() {
  useEffect(() => {
    register(hankoApi!).catch((error) => {
      console.error("Error registering Hanko:", error);
    });
  }, []);

  return <hanko-profile />;
}

export default function Dashboard() {
  const { id, loading: userDataLoading, error: userDataError } = useUserData();
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
  const [loadingKeys, setLoadingKeys] = useState(false);
  const [error, setError] = useState("");
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [loadingLogs, setLoadingLogs] = useState(false);
  const [logsError, setLogsError] = useState("");
  const [expandedLog, setExpandedLog] = useState<string | null>(null);

  const fetchApiKeys = async () => {
    setLoadingKeys(true);
    setError("");
    try {
      const response = await fetch("/api/getKeys", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });
      const data = await response.json();
      if (data.success) {
        setApiKeys(data.data);
      } else {
        setError(data.error);
      }
    } catch (error) {
      console.error("Error fetching API keys:", error);
      setError("Failed to load API keys.");
    } finally {
      setLoadingKeys(false);
    }
  };

  const fetchLogs = async () => {
    setLoadingLogs(true);
    setLogsError("");
    try {
      const response = await fetch("/api/getLogs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });
      const data = await response.json();
      if (data.success) {
        setLogs(data.data);
      } else {
        setLogsError(data.error);
      }
    } catch (error) {
      console.error("Error fetching logs:", error);
      setLogsError("Failed to load logs.");
    } finally {
      setLoadingLogs(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchLogs();
    }
  }, [id]);

  const toggleLogExpansion = (req_id: string) => {
    setExpandedLog((prev) => (prev === req_id ? null : req_id));
  };

  return (
    <div className="flex justify-center min-h-screen">
      <Tabs defaultValue="auditLogs" className="w-[800px]">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="auditLogs"><FaListAlt className="mr-2" /> Audit Logs</TabsTrigger>
          <TabsTrigger value="apiKeys" onClick={fetchApiKeys}><FaKey className="mr-2" /> API Keys</TabsTrigger>
          <TabsTrigger value="profile"><FaUser className="mr-2" /> Profile</TabsTrigger>
        </TabsList>

        <TabsContent value="auditLogs">
          <Card>
            <CardHeader>
              <CardTitle>Audit Logs</CardTitle>
              <CardDescription>View recent activity and changes.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {loadingLogs ? (
                <p>Loading logs...</p>
              ) : logsError ? (
                <p className="text-red-500">{logsError}</p>
              ) : (
                <ul className="space-y-2">
                  {logs.map((log) => (
                    <li key={log.req_id} className="p-2 border rounded">
                      <button
                        onClick={() => toggleLogExpansion(log.req_id)}
                        className="text-left w-full flex justify-between items-center"
                      >
                        <span><strong>Request ID:</strong> {log.req_id}</span>
                        {expandedLog === log.req_id ? <FaChevronUp /> : <FaChevronDown />}
                      </button>
                      {expandedLog === log.req_id && (
                        <div className="mt-2">
                          <strong>Timestamp:</strong> {new Date(log.timestamp).toLocaleString()}<br />
                          <strong>Request Data:</strong> {JSON.stringify(log.request_data)}<br />
                          <strong>Response Data:</strong> {JSON.stringify(log.response_data)}<br />
                          <strong>Type:</strong> {log.type}
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="apiKeys">
          <Card>
            <CardHeader>
              <CardTitle>API Keys</CardTitle>
              <CardDescription>Manage your API keys here.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <CreateApiKey />
              {loadingKeys ? (
                <p>Loading keys...</p>
              ) : error ? (
                <p className="text-red-500">{error}</p>
              ) : (
                <ul className="space-y-2">
                  {apiKeys.map((key) => (
                    <li key={key.id} className="p-2 border rounded">
                      {key.value || JSON.stringify(key)}
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Profile</CardTitle>
              <CardDescription>Update your profile information.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <HankoProfile />
              <LogoutBtn />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
