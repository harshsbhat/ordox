import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useUserData } from "@/hooks/useUserdata";
import { Label } from "@/components/ui/label"; 

export function CreateApiKey() {
  const [apiKey, setApiKey] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const { id, loading: userDataLoading, error: userDataError } = useUserData();

  const handleSubmit = async () => {
    setIsLoading(true);
    setError("");
    try {
      const response = await fetch("/api/generateKey", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }), // Send only the id in the request body
      });

      const data = await response.json();
      if (data.success) {
        setApiKey(data.data.result.key);
      } else {
        setError(data.error);
      }
    } catch (error) {
      console.error("Network error:", error);
      setError("Network error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Create API Key</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create API Key</DialogTitle>
          <DialogDescription>
            Click the button below to generate a new API key.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <>
              <div className="grid grid-cols-1">
                <Label htmlFor="api-key">API Key</Label>
                <div className="flex items-center">
                  <pre className="whitespace-pre-wrap break-words flex-grow">
                    <code>{apiKey}</code>
                  </pre>
                </div>
              </div>
              {error && <p className="text-red-500">{error}</p>}
            </>
          )}
        </div>
        <DialogFooter>
          <Button type="button" onClick={handleSubmit} disabled={isLoading || !id}>
            Generate API Key
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
