---
title: "Spark 시작하기"
date: 2022-04-01 17:30:00 +0900
status: In Progress
draft: false
tags:
  - Spark
---

## Spark 시작하기

---

웹 프로그래밍 입문을 위해 `Java` 의 간단한 웹 프레임워크인 `Spark` 를 알아보자.

우선 인텔리제이에서 `gradle` 프로젝트를 생성한다.

빌드가 완료되면 `build.gradle` 이라는 파일이 생성된다.

`Spark` 를 적용하기 위해 `build.gradle` 에 dependency 를 아래와 같이 추가한다.

```java
dependencies {
    implementation "com.sparkjava:spark-core:2.9.3" // add to build.gradle (for Java users)}
}
```

공식 [`Spark` 문서](https://sparkjava.com/download)에는 `compile` 키워드를 사용하라고 명시되어 있다.

`Gradle 7.0` 버전 부터 `implementation` 키워드를 대신 [사용하게 끔 변경](https://stackoverflow.com/questions/67366255/could-not-find-method-compile-for-arguments-com-sparkjavaspark-core2-9-3-o)되었다.

이제 `Spark` 를 사용할 준비가 완료 되었다.

```java
import static spark.Spark.*;

public class HelloWorld {
    public static void main(String[] args) {
        get("/users", (req, res) -> "Hello World");
    }
}
```

`main` 에 위와 같은 코드를 추가하여 실행해보자.

실행이 성공된 이후 브라우저를 통해 `localhost:4567/users` 에 접속해보자.

성공적으로 `Hello World` 가 출력된 것을 확인할 수 있다.

## GET 사용법

---

```java
public class HelloWorld {
    public static void main(String[] args) {
        get("/users", (req, res) -> "Hello World");
    }
}
```

위 코드는 `HTTP` 메서드인 `GET` 을 `Spark` 에서 사용하는 법이다.

앞서 언급한 `localhost:4567/hello` 의 의미부터 살펴보자.

`localhost` 에서 4567번 포트의 `/hello` 에 접속한다는 의미다.

`Spark` 의 기본 포트 번호는 4567 이고 `port()` 를 통해 포트 번호를 변경할 수 있다.

```java
public static void get(final String path, final Route route) {
    getInstance().get(path, route);
}
```

이번엔 `get()` 메서드의 내부를 살펴보자.

parameter 로 `path` 와 `route` 를 받고 있다.

호출하는 메서드를 다시 살펴보면 `path` 는 `“/users"` 임을 알 수 있고, `route` 는 람다식이 argument 로 주어지는 것을 확인할 수 있다.

이를 통해 `get()` 메서드가 URL path 를 첫번째 argument 로 받고 해당 주소에 수행되는 행위를 람다식으로 표현하고 있다는 것을 예측할 수 있다.

```java
public class HelloWorld {
    public static void main(String[] args) {
        get("/users/:name", (req, res) -> "Hello " + req.params(":name"));
    }
}
```

다른 `get()` 사용 예시를 보자.

이번엔 `path` 값에 `"/users/:name"` 을 전달했다.

브라우저에서 `localhost:4567/users/meatsby` 를 호출했을 때, `:name` 값에 meatsby 가 할당된다.

`req.params()` 메서드를 통해 전달받은 값을 새로운 문자열에 추가시켜 `localhost:4567/users/meatsby` 주소에서 “Hello meatsby” 를 출력하게 된다.

```java
public class HelloWorld {
    public static void main(String[] args) {
        get("/users", (req, res) -> "Hello " + req.queryParams("name") + " 나이는 " + req.queryParams("age"));
    }
}
```

또 다른 `get()` 사용 예시를 보자.

브라우저에서 `localhost:4567/users?name=meatsby&age=26` 를 호출한다.

`?name=meatsby&age=26` 이 구문은 쿼리스트링이라고 불리는데, `name` 값에 meatsby 를 `age` 값에 26 을 전달하겠다는 의미를 갖고있다.

쿼리스트링으로 전달된 값들은 `req.queryParams()` 메서드를 통해 `name` 값과 `age` 값을 받아 전달받은 값을 새로운 문자열에 추가시켜 `localhost:4567/users?name=meatsby&age=26` 주소에서 “Hello meatsby 나이는 26” 을 출력하게 된다.

```java
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Sign Up</title>
</head>
<body>
<h1>Sign Up</h1>
<form action="/users">
    Name : <input type="text" name="name">
    <br>
    <br>
    Age : <input type="text" name="age">
    <br>
    <br>
    <input type="submit" value="Sign Up">
</form>
</body>
</html>
```

이번엔 정적 `html` 을 추가해 사용자 입력을 UI 로 받아보자.

`form.html` 을 `resources.static` 에 추가하면 `localhost:4567/form.html` 을 통해 새로운 UI 가 출력된다.

`form.html` 내부의 `input` 태그를 통해 데이터가 서버로 전달된다.

각 블록에 데이터를 집어넣고 버튼을 클릭하면 URL 이 redirect 되는 것을 볼 수 있다.

이때 `form` 태그의 `action` 을 통해 해당 데이터를 전달할 주소를 명시할 수 있다.

이제 데이터는 `action` 이 가리키는 `/users` 주소를 갖고 있는 `main` 의 `get()` 메서드에 전달된다.

전달된 `name` 과 `age` 를 `route` 람다식에 적용되어 기존에 `localhost:4567/users?name=meatsby&age=26` 를 호출했던 화면으로 이동할 수 있는 것을 볼 수 있다.

만약 해당 웹사이트가 회원가입에 관한 웹사이트이고 입력받는 박스에 비밀번호를 입력한다고 가정했을 때, url 에 비밀번호가 그대로 노출되는 것은 보안상 문제가 있을 것이다.

이 때 적용할 수 있는 것이 `POST` 메서드이다.

## POST 사용법

---

```java
public class HelloWorld {
    public static void main(String[] args) {
        post("/users", (req, res) -> "Hello " + req.queryParams("name") + " 나이는 " + req.queryParams("age"));
    }
}
```

`post()` 사용법은 간단하다. 위에 나온 것 처럼 `get()` 메서드를 `post()` 로 변경해주면 된다.

이럴 경우 같은 방법으로 브라우저에서 데이터를 전달해도 url 에 parameter 가 노출되지 않는다.

```java
<form action="/users" method="post">
```

다만 주의할 점은 `form` 태그의 기본 메서드는 `get` 이기 때문에 `post` 로 변경해줘야한다.

## template engine 사용법

---

### template engine 이란?

template engine 은 `html` 파일을 동적으로 만들 때 사용하는 도구이다.

- `localhost:4567/form.html` - 사용자 입력을 받는 정적 `html`
- `localhost:4567/users` - 입력받은 결과를 보여주는 동적 `html`

### template engine 을 쓰는 이유

```java
public class HelloWorld {
    public static void main(String[] args) {
        post("/users", (req, res) -> {
            return "<html>" +
                   "<body>" +
            // ...
                   "</body>" +
                   "</html>";
        }
    }
}
```

사용자의 입력에 따라 달라지는 `localhost:4567/users` 를 `html` 로 표현하고자 한다.

이를 수행하기 위해선 위 코드와 같이 `route` 의 람다식 바디에 `html` 태그를 문자열로 넣어주면된다.

하지만 이는 굉장히 불편하고 비효율적인 방법이다.

이를 해결하기 위해 존재하는 것이 template engine 인데, `html` 파일 경로를 argument 로 받아 위 코드와 같은 효과를 내줄 수 있게 만들어 준다.

### dependency 적용

```java
dependencies {
    implementation "com.sparkjava:spark-template-handlebars:2.7.1"
}
```

`Spark` 에서 지원하는 다양한 template engine 중에 handlebars 를 사용한다.

template engine 을 활용하기 위해 `build.gradle` 에 위와 같은 코드를 추가해준다.

### render 메서드 추가

```java
public static String render(Map<String, Object> model, String templatePath) {
    return new HandlebarsTemplateEngine().render(new ModelAndView(model, templatePath));
}
```

`main` 에 위와 같은 메서드를 추가해준 뒤 template engine 을 활용하여 데이터를 출력할 수 있다.

```java
public static void main(String[] args) {
    staticFiles.location("/static");

    post("/users", (req, res) -> {
        Map<String, Object> model = new HashMap<>();
        model.put("name", req.queryParams("name"));
        model.put("age", req.queryParams("age"));

        return render(model, "result.html");
    });
}
```

`render()` 메서드는 `Map<String, Object>` 형식으로 구성되어 있는 `model` 을 인자로 받는다.

- `model` 의 key = template 에서 사용하는 변수 `{{name}}`
- `model` 의 value = `post` 요청으로 받은 값 `“meatsby”`

```java
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Sign Up</title>
</head>
<body>
<h1>Sign Up Result</h1>
Name : {{name}}, Age : {{age}}
<br>
</body>
</html>
```

`render()` 메서드에 사용할 `result.html` 을 위와 같이 만들어 준다.

`Spark` 에서 동적 `html` 파일은 항상 `resources.templates` 로 접근하게 끔 설정되어 있기 때문에 `result.html` 을 꼭 해당 디렉토리에 위치시켜야 한다.

handlebars 는 Mustache 문법을 사용하는데, `{{name}}` 은 `model` 에서 키값이 `name` 인 값을 가져온다.

## java bean 과  handlebars 반복문

---

### java bean 이란?

java bean 이란, 기본 생성자가 있고, iv 를 가지고 있으며, iv 에 대한 getter 와 setter 가 존재하는 클래스다.

### handlebars 반복문

```java
public static void main(String[] args) {
    staticFiles.location("/static");

    List<User> users = new ArrayList<>();

    post("/users", (req, res) -> {
        User user = new User(req.queryParams("name"), req.queryParams("age"));
        users.add(user);

        Map<String, Object> model = new HashMap<>();
        model.put("users", users);

        return render(model, "result.html");
    });
}
```

`main` 이 `User.java` 라는 java bean 클래스가 생기고 `post` 요청으로 전달된 인자들을 통해 `user` 를 생성하여 리스트에 담아 template 에 넘겨주는 메서드로 변경되었다.

### 이럴 경우 result.html 은 어떻게 변해야 할까?

```java
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Sign Up</title>
</head>
<body>
<h1>Sign Up Result</h1>
{{#users}}
Name : {{name}}, Age : {{age}}
<br>
{{/users}}
</body>
</html>
```

간단하다. `{{#users}}` 와 `{{/users}}` 코드 사이의 있는 구문에서 자연스럽게 반복문을 돌아 `user` 리스트에서 하나 씩 출력한다.

내부의 `{{name}}` 과 `{{age}}` 는 사실 `{{user.name}}` 과 `{{user.age}}` 이지만, `{{#users}}` 와 `{{/users}}` 에게 감싸져 있기 때문에 생략이 가능하다.

여기서 `{{user.name}}` 은 `user.getName()` 과 같다.

## References

---

- [https://sparkjava.com/](https://sparkjava.com/)
- [https://stackoverflow.com/questions/67366255/could-not-find-method-compile-for-arguments-com-sparkjavaspark-core2-9-3-o](https://stackoverflow.com/questions/67366255/could-not-find-method-compile-for-arguments-com-sparkjavaspark-core2-9-3-o)
