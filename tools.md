---
outline: deep
---
# Adding Tools

You can read about Tools [here](https://alnutile.medium.com/what-are-tools-in-the-scope-of-llms-and-why-are-they-so-important-f57f76190e58)

This will show how you can add and register Functions/Tools with the system.

Here is one of the 3-4 that come with LaraLlama so far [https://github.com/LlmLaraHub/larallama/blob/main/Modules/LlmDriver/app/Functions/StandardsChecker.php](https://github.com/LlmLaraHub/larallama/blob/main/Modules/LlmDriver/app/Functions/StandardsChecker.php)

## What gets passed into the function

```php
    /**
    * @param  MessageInDto[]  $messageArray
    */
    public function handle(
        array $messageArray,
        HasDrivers $model,
        FunctionCallDto $functionCallDto): FunctionResponse
    {
        Log::info('[LaraChain] StandardsChecker Function called');
```

The function will always get 

  1. A message array of MessageInDto
  2. Model that is compativel with HasDrivers
  3. FunctionCallDto, see the class for more details

Then you can do what you need to do, send emails, texts, get the weather, search the web etc!

You want to do two things when done:

```php
      notify_ui($model->getChat(), 'Wow that was a lot of document!');

      notify_ui_complete($model->getChat());

      return FunctionResponse::from([
         'content' => implode('\n', $this->results),
         'prompt' => implode('\n', $this->promptHistory),
         'requires_followup' => false,
         'documentChunks' => collect([]),
      ]);
```

Notify the ui as you are done so the user knows things are happening!

Then return a **FunctionResponse** so the next function or final LLM call knows what to do.

### documentChunks
Sometimes you might not have documentChunks and that is fine. And require_follow up is a nice way to chain other functions to your function. More on that later. The code will show what it will  with that btw.

### prompt
The prompt history is nice, the user can see the full prompt so they understand the prompt and can use it again or in other systems!

### content
Then content is the results so the next function/class/tool has that info.

## Register Function

You can then register your tool [https://github.com/LlmLaraHub/larallama/blob/main/Modules/LlmDriver/app/LlmDriverClient.php#L58](https://github.com/LlmLaraHub/larallama/blob/main/Modules/LlmDriver/app/LlmDriverClient.php#L58)

From here on the system should see it and allow the LLMs to use it. Here is a good example

[https://github.com/LlmLaraHub/larallama/blob/main/Modules/LlmDriver/app/OpenAiClient.php#L173C10-L173C18](https://github.com/LlmLaraHub/larallama/blob/main/Modules/LlmDriver/app/OpenAiClient.php#L173C10-L173C18)

I have not fully writting the ability to respond to OpenAi functions but that is coming soon.


That is about it for now you are ready to add functions to the system. [https://github.com/LlmLaraHub/larallama/blob/main/Modules/LlmDriver/app/Orchestrate.php#L40](https://github.com/LlmLaraHub/larallama/blob/main/Modules/LlmDriver/app/Orchestrate.php#L40)

Ideally as seen in the article LaraLlama should listen for the api to ask for tool usage.
