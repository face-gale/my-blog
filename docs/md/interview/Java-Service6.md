# 如何理解 RESTful API 的幂等性
## 什么是幂等性
HTTP 幂等方法，是指无论调用多少次都不会有不同结果的 HTTP 方法。不管你调用一次，还是调用一百次，一千次，结果都是相同的。
```
GET     /tickets       # 获取ticket列表
GET     /tickets/12    # 查看某个具体的ticket
POST    /tickets       # 新建一个ticket
PUT     /tickets/12    # 更新ticket 12
PATCH   /tickets/12    # 更新ticket 12
DELETE  /tickets/12    # 删除ticekt 12
```

### HTTP GET 方法
HTTP GET 方法，用于获取资源，不管调用多少次接口，结果都不会改变，所以是幂等的。
```
GET     /tickets       # 获取ticket列表
GET     /tickets/12    # 查看某个具体的ticket
```

只是查询数据，不会影响到资源的变化，因此我们认为它幂等。

值得注意，幂等性指的是作用于结果而非资源本身。怎么理解呢？例如，这个 HTTP GET 方法可能会每次得到不同的返回内容，但并不影响资源。

可能你会问有这种情况么？当然有咯。例如，我们有一个接口获取当前时间，我们就应该设计成
```
GET     /service_time # 获取服务器当前时间
```

它本身不会对资源本身产生影响，因此满足幂等性。

### HTTP POST 方法
HTTP POST 方法是一个非幂等方法，因为调用多次，都将产生新的资源。
```
POST    /tickets       # 新建一个ticket
```
因为它会对资源本身产生影响，每次调用都会有新的资源产生，因此不满足幂等性。

### HTTP PUT 方法
HTTP PUT 方法是不是幂等的呢？我们来看下
```
PUT     /tickets/12    # 更新ticket 12
```
因为它直接把实体部分的数据替换到服务器的资源，我们多次调用它，只会产生一次影响，但是有相同结果的 HTTP 方法，所以满足幂等性。

### HTTP PATCH 方法
HTTP PATCH 方法是非幂等的。HTTP POST 方法和 HTTP PUT 方法可能比较好理解，但是 HTTP PATCH 方法只是更新部分资源，怎么是非幂等的呢?

因为，PATCH 提供的实体则需要根据程序或其它协议的定义，解析后在服务器上执行，以此来修改服务器上的资源。换句话说，PATCH 请求是会执行某个程序的，如果重复提交，程序可能执行多次，对服务器上的资源就可能造成额外的影响，这就可以解释它为什么是非幂等的了。

可能你还不能理解这点。我们举个例子
```
PATCH   /tickets/12    # 更新ticket 12
```

此时，我们服务端对方法的处理是，当调用一次方法，更新部分字段，将这条 ticket 记录的操作记录加一，这次，每次调用的资源是不是变了呢，所以它是有可能是非幂等的操作。

### HTTP DELETE 方法
HTTP DELETE 方法用于删除资源，会将资源删除。
```
DELETE  /tickets/12    # 删除ticekt 12
```
调用一次和多次对资源产生影响是相同的，所以也满足幂等性。

## 如何设计符合幂等性的高质量 RESTful API
### HTTP GET vs HTTP POST

也许，你会想起一个面试题。**HTTP 请求的 GET 与 POST 方式有什么区别**？ 你可能会回答到：GET 方式通过 URL 提交数据，数据在 URL 中可以看到；POST 方式，数据放置在 HTML HEADER 内提交。但是，我们现在从 RESTful 的资源角度来看待问题，HTTP GET 方法是幂等的，所以它适合作为查询操作，HTTP POST 方法是非幂等的，所以用来表示新增操作。

但是，也有例外，我们有的时候可能需要把查询方法改造成 HTTP POST 方法。比如，超长（1k）的 GET URL 使用 POST 方法来替代，因为 GET 受到 URL 长度的限制。虽然，它不符合幂等性，但是它是一种折中的方案。

### HTTP POST vs HTTP PUT
对于 HTTP POST 方法和 HTTP PUT 方法，我们一般的理解是 POST 表示创建资源，PUT 表示更新资源。当然，这个是正确的理解。

但是，实际上，两个方法都用于创建资源，更为本质的差别是在幂等性。HTTP POST 方法是非幂等，所以用来表示创建资源，HTTP PUT 方法是幂等的，因此表示更新资源更加贴切。

### HTTP PUT vs HTTP PATCH
此时，你看会有另外一个问题。HTTP PUT 方法和 HTTP PATCH 方法，都是用来表述更新资源，它们之间有什么区别呢？我们一般的理解是 PUT 表示更新全部资源，PATCH 表示更新部分资源。首先，这个是我们遵守的第一准则。根据上面的描述，PATCH 方法是非幂等的，因此我们在设计我们服务端的 RESTful API 的时候，也需要考虑。如果，我们想要明确的告诉调用者我们的资源是幂等的，我的设计更倾向于使用 HTTP PUT 方法。

## 如何保证接口的幂等性
当通过调用创建实例接口在负载均衡中创建云服务器时，如果遇到了请求超时或服务器内部错误时，客户端可能会尝试重发请求，这时客户端可以通过提供可选参数 ClientToken 避免服务器创建出比预期要多的实例，也就是通过提供 ClientToken 参数保证请求的幂等性。ClientToken 是一个由客户端生成的唯一的、大小写敏感、不超过 64 个 ASCII 字符的字符串。

如果用户使用同一个 ClientToken 值调用创建实例接口，则服务端会返回相同的请求结果，包含相同的 InstanceId。因此用户在遇到错误进行重试的时候，可以通过提供相同的 ClientToken 值，来确保负载均衡只创建一个实例，并得到这个实例的 InstanceId。

如果用户提供了一个已经使用过的 ClientToken，但其他请求参数不同，则负载均衡会返回 IdempotentParameterMismatch 的错误代码。但需要注意的是，SignatureNonce、Timestamp 和 Signature 参数在重试时是需要变化的，因为负载均衡使用 SignatureNonce 来防止重放攻击，使用 Timestamp 来标记每次请求时间，所以再次请求必须提供不同的 SignatureNonce 和 Timestamp 参数值，这同时也会导致 Signature 值的变化。

通常，客户端只需要在 500（InternetError）或 503（ServiceUnavailable）错误、或者无法得到响应结果的情况下进行重试操作。返回结果是 200 时，重试可以得到上次相同的结果，但不会对服务端状态带来任何影响。而对 4xx 的返回错误，通常重试也是不能成功的。