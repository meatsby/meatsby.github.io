---
title: "@RequestBody Binding"
date: 2022-05-23 23:30:00 +0900
status: In Progress
draft: false
tags:
  - Spring Boot
---
## 경로 조회 미션 진행 도중 받은 피드백
---
![[Mission Feedback.png]]

해당 리뷰는 DTO 의 기본 생성자에 대한 피드백이다.

스프링을 익히는 것에 급급하다 보니 막연하게 기본 생성자를 추가하면 `@RequestBody` 가 알아서 객체로 변환된다는 사실만 알고 사용하고 있었다.

스프링을 점차 적응함에 따라 문득 이런 질문이 머릿속에 떠오른다.

> `@RequestBody` 로 객체를 어떻게 생성하는거지?
> 

> 일단 기본 생성자가 없으면 작동하지 않으니까, 기본 생성자로 생성할 것 같아.
> 

> 근데 기본 생성자가 `private` 이어도 작동하던데 어떻게 접근하는거지?
> 

> 어떻게 생성했다고해도 내 DTO 는 `setter` 가 없는데 어떻게 필드값을 할당할까?
> 

해당 질문들을 정리해보면, 크게 두 가지 질문으로 정리할 수 있다.

1. 객체를 생성하는 과정?
2. 생성된 객체에 필드값을 할당하는 과정?

위와 같은 궁금증들을 해결하기 위해 코드 여행을 떠나보기로 했다.

## 객체 생성하기
---
### `RequestResponseBodyMethodProcessor.java`

![[RequestResponseBodyMethodProcessor.png]]

`@ResponseBody` 의 바인딩 처리 수행 시 위 메서드가 호출된다.

### `AbstractMessageConverterMethodArgumentResolver.java`

![[AbstractMessageConverterMethodArgumentResolver.png]]

`readWithMessageConverters()` 는 해당 클래스에서 수행되는데, 메서드 내부를 살펴보면 10개의 `messageConverters` 를 순회하며 ContentType 으로 읽을 수 있는 Converter 를 찾는다.

JSON 요청이기 때문에 `MappingJackson2HttpMessageConverter` 로 Body 를 `read()` 한다.

### `AbstractJackson@HttpMessageConverter.java`

![[AbstractJackson@HttpMessageConverter.png]]

해당 클래스 내부에서 `read()` 메서드는 `readJavaType()` 을 호출한다.

이 메서드 내부에서 `ObjectMapper` 의 `readValue()` 를 호출한다.

### 잠깐... ObjectMapper 가 뭐야?

ObjectMapper 란 기본 POJO(Plain Old Java Objects) 또는 JSON Tree Model 에서 JSON 을 읽고 쓰는 기능과 변환 수행을 위한 기능을 제공하는 클래스다.

즉, Java Object ← → JSON 파싱을 간편하게 해주는 클래스라고 정리할 수 있다.

### `ObjectMapper.java`

![[ObjectMapper_readValue.png]]

![[ObjectMapper_readMapAndClose.png]]

`readValue()` 내부에서 Request 의 Body 의 `null` 체크만 진행하고 `readMapAndClose()` 를 호출한다.

이후 `readMapAndClose()` 내부에서 `_findRootDeserializer()` 메서드를 호출하는데, `@RequestBody` 로 바인딩 될 객체인 `RequestDto` 가 빈이므로 이 메서드에서 `BeanDeserializer` 를 반환한다.

이후 반환받은 `BeanDeserializer` 를 `readRootValue()` 메서드로 넘긴다.

### Deserialize? 그건 뭐야?

- Serialize(직렬화) - Java Object → JSON
- Deserialize(역직렬화) - JSON → Java Object

### `DefaultDeserializationContext.java`

![[DefaultDeserializationContext.png]]

전달받은 `BeanDeserializer` 의 `deserialize()` 로 JSON → Java Object 역직렬화를 수행한다.

### `BeanDeserializer.java`

![[BeanDeserializer.png]]

`BeanDeserializer` 의 `deserialize()` 내부에서 `p.isExpectedStartObjectToken()` 을 통해 JSON 이 “{” 로 시작하는지 확인한다.

이후 `deserializeFromObject()` 메서드를 호출한다.

![[createUsingDefault.png]]

`deserializeFromObject()` 내부를 확인하면 `createUsingDefault()` 를 호출하는 것을 알 수 있다.

### `StdValueInstantiator.java`

![[StdValueInstantiator.png]]

`createUsingDefault()` 내부에서 객체의 기본생성자인 `_defaultCreator.call()` 를 호출한다.

### `AnnotatedConstructor.java`

![[AnnotatedConstructor.png]]

`call()` 메서드 내부를 살펴보면 Java Reflection API 의 Constructor 클래스인 `_constructor` 의 `newInstance()` 메서드를 호출한다.

### `Constructor.java`

![[Constructor.png]]

해당 메서드 내부를 살펴보면 Reflection 을 통해 인스턴스를 생성하여 반환하는 것을 볼 수 있다.

이로써, `@RequestBody` 바인딩 수행 과정에서 해당 객체를 어떻게 생성하는지 확인할 수 있다.

### Reflection 은 뭐야?

Java Reflection 이란, 접근 제어자와 관계 없이 클래스 객체를 동적으로 생성하는(런타임) Java API 다.

Java 는 정적 언어이기 때문에, 컴파일 시점에 객체 타입을 결정한다.

Java Reflection 은 구체적인 클래스 타입을 알지 못해도, 그 클래스의 메서드, 타입, 변수들에 접근할 수 있게 해준다.

Reflection 을 통해 가져올 수 없는 정보 중 하나가 바로 생성자의 인자 정보들이다. 때문에, 기본 생성자 없이 인자가 포함된 생성자만 존재한다면 Reflection 을 통해 객체를 생성할 수 없다.

## 기본 생성자가 없다면?
---
### `BeanDeserializer.java`

![[deserializeFromObjectUsingNonDefault.png]]

`BeanDeserializer.java` 의 `_nonStandardCreation` 분기에 걸려 `deserializeFromObjectUsingNonDefault()` 메서드로 객체 생성을 시도한다.

### `BeanDeserializerBase.java`

![[BeanDeserializerBase.png]]

`deserializeFromObjectUsingNonDefault()` 내부를 살펴보면, `createUsingDelegate()` 혹은 `_deserializeUsingPropertyBased()` 를 통해 객체 생성을 시도한다.

현재 사용하는 RequestDTO 는 delegate 을 하거나 property 설정을 해준 것이 아니기 때문에 이 부분에서 예외가 발생한다.

## 여기까지 객체 생성 과정 정리
---
- `@RequestBody` 를 바인딩하기 위해 `ObjectMapper` 를 사용하는데, Java Reflection API 를 통해 객체를 생성하기 때문에 기본 생성자가 필수적이다.
- `@JsonProperty` `@JsonAutoDetect` 등을 사용한 `propertBasedCreator` 나 생성자가 위임되어 `delegateBasedCreator` 가 있다면 기본 생성자가 없어도 된다.

## 생성된 객체에 필드값 주입하기
---
### ObjectMapper 가 JSON 과 Java Object 를 매칭하는 방법?

기본적으로 Jackson 은 JSON 필드의 이름을 Java Object 의 getter 와 setter 메서드와 일치시켜 각 필드값을 매칭한다.

Jackson 은 `getter` 및 `setter` 메서드의 `"get"` `"set"` 을 제거한 후 나머지 이름의 첫 문자를 소문자로 변환하여 JSON 필드값과 일치시킨다.

즉, 동일한 이름의 변수를 직접 찾지 않고 `getter` 와 `setter` 를 통해 찾아 매칭한다.

### `BeanDeserializerFactory.java`

![[BeanDeserializerFactory.png]]

`buildBeanDeserializer()` 메서드 내부에서 `addBeanProps()` 를 통해 `getter` 와 `setter` 로 Bean Property 를 찾는 과정을 수행한다.

### `BeanDeserializer.java`

![[deserializeAndSet.png]]

다시 `BeanDeserializer.java` 로 돌아와서, `_beanProperties.find(propName)` 으로 위에서 저장했던 Bean Property 를 가져와 `SettableBeanProperty` 를 만든다.

이후, `deserializeAndSet()` 메서드를 통해 필드값을 주입한다.

### `FieldProperty.java`

![[FieldProperty.png]]

`deserializeAndSet()` 내부를 살펴보면, `_field.set()` 을 통해 값을 주입하는 것을 알 수 있다.

여기서 `_field` 는 Reflection API 의 Field 자료형이다.

따라서, Reflection API 를 통해 값을 주입하기에 `setter` 가 불필요하다는 것을 알 수 있다.

## 결론
---
- `@RequestBody` 를 바인딩하기 위해 `ObjectMapper` 를 사용하는데, Java Reflection API 를 통해 객체를 생성하기 때문에 기본 생성자가 필수적이다.
- `@JsonProperty` `@JsonAutoDetect` 등을 사용한 `propertBasedCreator` 나 생성자가 위임되어 `delegateBasedCreator` 가 있다면 기본 생성자가 없어도 된다.
- `ObjectMapper` 는 Jackson 을 통해 `getter` 와 `setter` 로 DTO 필드값을 가져오며 `getter` 혹은 `setter` 만 있어도 된다.
- Jaskson 을 통해 생성된 Bean Property 에 Reflection 을 사용하여 필드값을 주입한다.

### 추가적으로 공부할 것

- delegateBasedCreator, propertyBasedCreator
- Reflection 으로 주입하는 과정

## References
---
- [https://da-nyee.github.io/posts/woowacourse-why-the-default-constructor-is-needed/](https://da-nyee.github.io/posts/woowacourse-why-the-default-constructor-is-needed/)
- [https://velog.io/@conatuseus/RequestBody에-기본-생성자는-왜-필요한가](https://velog.io/@conatuseus/RequestBody%EC%97%90-%EA%B8%B0%EB%B3%B8-%EC%83%9D%EC%84%B1%EC%9E%90%EB%8A%94-%EC%99%9C-%ED%95%84%EC%9A%94%ED%95%9C%EA%B0%80)
- [https://velog.io/@conatuseus/RequestBody에-왜-기본-생정자는-필요하고-Setter는-필요-없을까-2-ejk5siejhh](https://velog.io/@conatuseus/RequestBody%EC%97%90-%EC%99%9C-%EA%B8%B0%EB%B3%B8-%EC%83%9D%EC%A0%95%EC%9E%90%EB%8A%94-%ED%95%84%EC%9A%94%ED%95%98%EA%B3%A0-Setter%EB%8A%94-%ED%95%84%EC%9A%94-%EC%97%86%EC%9D%84%EA%B9%8C-2-ejk5siejhh)
- [https://velog.io/@conatuseus/RequestBody에-왜-기본-생성자는-필요하고-Setter는-필요-없을까-3-idnrafiw](https://velog.io/@conatuseus/RequestBody%EC%97%90-%EC%99%9C-%EA%B8%B0%EB%B3%B8-%EC%83%9D%EC%84%B1%EC%9E%90%EB%8A%94-%ED%95%84%EC%9A%94%ED%95%98%EA%B3%A0-Setter%EB%8A%94-%ED%95%84%EC%9A%94-%EC%97%86%EC%9D%84%EA%B9%8C-3-idnrafiw)
