---
outline: deep
---

# APIs for the Code

## Completion Pools

Sometimes you want to make multiple requests at once. For 
example the `Modules/LlmDriver/app/Functions/StandardsChecker.php:38`

Will call the:

```php
$results = LlmDriverFacade::driver($model->getDriver())
    ->completionPool($prompts);
    
```

This will then do multiple requests to the Driver's Api at once as seen here `Modules/LlmDriver/app/GroqClient.php:105`

```php
 public function completionPool(array $prompts, int $temperature = 0): array
    {
        $token = Setting::getSecret('groq', 'api_key');

        if (is_null($token)) {
            throw new \Exception('Missing Groq ai api key');
        }

        $model = $this->getConfig('groq')['models']['completion_model'];
        $maxTokens = $this->getConfig('groq')['max_tokens'];

        $responses = Http::pool(function (Pool $pool) use
        (
            $prompts,
            $token,
            $model,
            $maxTokens
        ) {
            foreach ($prompts as $prompt) {
                $pool->withHeaders([
                    'content-type' => 'application/json',
                    'Authorization' => 'Bearer '.$token,
                ])->withToken($token)
                    ->retry(3, 6000)
                    ->timeout(120)
                    ->baseUrl($this->baseUrl)
                    ->post('/chat/completions', [
                        'model' => $model,
                        'max_tokens' => $maxTokens,
                        'messages' => [
                            [
                                'role' => 'user',
                                'content' => $prompt,
                            ],
                        ],
                    ]);
            }

        });

        $results = [];

        foreach ($responses as $index => $response) {
            if ($response->ok()) {
                $response = $response->json();
                foreach (data_get($response, 'choices', []) as $result) {
                    $result = data_get($result, 'message.content', '');
                    $results[] = CompletionResponse::from([
                        'content' => $result,
                    ]);
                }
            } else {
                Log::error('Groq API Error ', [
                    'index' => $index,
                    'error' => $result->body(),
                ]);
            }
        }

        return $results;
    }
```