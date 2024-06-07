---
outline: deep
---

# APIS for Output

## Output API

When using the API Output (with a chat widget for examples) you will be given a URL from the UI.

In this example we will use this `http://larachain.test/api/outputs/15/chat`

It will also give you a public token `12345`. This will be seen in the JS.

> NOTE: We will have url limitations and other security features shortly

So your fetch might look like this:

```js
  const API_URL = "http://larachain.test/api/outputs/15/chat";
  
 const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({
      messages: [{ role: "user", content: userMessage }],
    }),
  };

  // Send POST request to API, get response and set the reponse as paragraph text
  fetch(API_URL, requestOptions)
    .then((res) => res.json())
    .then((data) => {
      messageElement.textContent = data.choices[0].message.content.trim();
    })
    .catch(() => {
      messageElement.classList.add("error");
      messageElement.textContent =
        "Oops! Something went wrong. Please try again.";
    })
    .finally(() => chatbox.scrollTo(0, chatbox.scrollHeight));
};
```

### POST 
`/api/outputs/15/chat`


### REQUEST BODY

```json
{
    "message":  [
        { "role": "user", "content": "Hello Support!" }
    ]
}
```

You could send the history as well 

```json
{
    "message":  [

        { "role": "user", "content": "Hello Support!" }
        { "role": "assistant", "content": "Hello back" }
        { "role": "user", "content": "Can you help me with out to do something?" }
    ]
}
```

### RESPONSE



## Sources
