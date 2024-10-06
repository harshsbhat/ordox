# Cost-based rate limiting API

## Overview

This is a JSON processing service that transforms unstructured data into well-structured JSON using OpenAI 3.5 turbo and gpt4



Check it out [here](https://ordox.vercel.app/)

## Ratelimits

- We use Unkey for rate-limiting 
- `/api/json` uses gpt-4 ( 2 request limit per 30 seconds )

- `/api/jsonCheap` uses gpt-turbo-3.5 ( 4 request limit per 30 seconds )


## Prerequisites

[Unkey](https://app.unkey.com/)

[OpenAI API](https://platform.openai.com/docs/overview)

[Upstash Redis](https://console.upstash.com/) (**Optional** as we just keep track of total requests using this)


## Setup Unkey 

1. Go to unkey [ratelimits](https://app.unkey.com/ratelimits)

2. Create a new namespace with name `harshbhat`

3. Go to settings/root-keys and create a root key with Ratelimit permissions

4. Add it in the .env file `UNKEY_ROOT_KEY`

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/harshsbhat/ordox.git
   cd ordox
   ```

2. **Setup .env files `cp .env.example .env`**

    MANDATORY:
    
     ```bash
     OPENAI_API_KEY=""
     UNKEY_ROOT_KEY=""
     ```
  
    OPTIONAL:
    
     ```bash
      UPSTASH_REDIS_REST_URL=""
      UPSTASH_REDIS_REST_TOKEN=""
     ```
3. **Install dependencies and run the project it should start on port 3000**
    
     ```bash
     pnpm i
     pnpm dev
     ```
   
## Usage

You can use `https://ordox.vercel.app/api/json` to convert your Unstructured data into JSON using OpenAI gpt-4 model. Although it has a limit of 2 requests per 30 seconds

You can use `http://localhost:3000/api/jsonCheap` to convert your Unstructured data into JSON using OpenAI gpt-3.5-turbo model. This one has a limit of 4 requests per 30 seconds


## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)



