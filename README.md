# Waffle
*Easily interact with external API's*
## What is Waffle?
Waffle is a javascript / typescript package to simplify the process of using the builtin fetch()  API. Waffle aims to make the process of contacting or interacting with third party or external API's easy.

## How does Waffle work?
Waffle has two different ways of using the fetch() API:
- **Waffle** - The standard method. You declare a class that has the base URL (eg. https://example.com/api), and you make calls to this API via class methods. (eg. ```MyWaffle.Get('/users')```)
- **QuickWaffle** - A way to quickly contact the fetch() API, useful for when you are making one call to an external API, or multiple calls to seperate API's.

Each fetch method returns a WaffleResponse class, which makes it easier than ever to access response data. The body can be accessed simply by using ```Response.body``` or ```Response.json()```. WaffleResponses make it extremely easy to streamline the processing of data, without having to deal with the endless chain of ```.then(...).then(...).then(...)```

## Documentation
#### **Waffle**
The base class for interacting with an API.\
```new Waffle(basurl: string, headers: Headers)```

**Properties**\
```baseurl: string``` - The base URL that all API endpoints extend from\
```headers: Headers``` - The base headers that will be included in all API calls

**Methods**\
```Get(endpoint: string, additionalheaders: Headers?)```: ```WaffleResponse```\
```Post(endpoint: string, body: any, additionalheaders: Headers?)```: ```WaffleResponse```\
```Update(endpoint: string, body: any, additionalheaders: Headers?)```: ```WaffleResponse```\
```Create(endpoint: string, body: any, additionalheaders: Headers?)```: ```WaffleResponse```\
```Delete(endpoint: string, body: any, additionalheaders: Headers?)```: ```WaffleResponse```

#### **QuickWaffle**
A way to quickly contact an API or endpoint without creating a Waffle.

**Methods**\
```[static] Get(URL: string, Headers: headers)```\
```[static] Post(URL: string, body: any, headers: Headers)```\
```[static] Update(URL: string, body: any, headers: Headers)```\
```[static] Create(URL: string, body: any, headers: Headers)```\
```[static] Delete(URL: string, body: any, headers: Headers)```

#### **WaffleResponse**
The base class containing response information from API calls\
```new WaffleResponse(ResponseCode: number, Body: any, ContentType: string, StatusText: string, Headers: Headers)```

**Properties**\
```code: number``` - The response code the API call returned\
```body: any``` - The body that was returned with the API call\
```statustext: string``` - The status text returned by the API call\
```contenttype: string``` - The ContentType header provided by the response\
```headers: Headers``` - The headers returned by the API call

**Methods**\
```json()``` - Returns the JSON/Object version of the ```body``` attribute.