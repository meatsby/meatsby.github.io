---
title: '[우아한테크코스 4기] 프리코스 3주차 회고'
author: meatsby
date: 2021-12-14 10:00:00 +0900
categories: [WOOWACOURSE, Pre Course]
tags: [WoowaCourse]
---

## **🥤 3주차 미션 - 자판기**

---

3주차 미션은 자판기 구현이었다.

확실히 1, 2주차에 비해 상당히 난이도가 올라간 것을 확인할 수 있었다.

하지만 1, 2주차 간 배운 것이 많았기 때문에 시간은 오래 걸렸지만 2주차 보다 더 깔끔한 구조로 프로그램을 완성할 수 있었고 어려웠기 때문에 많은 것을 얻을 수 있는 시간이었던 것 같다.

아래와 같이 작동을 할 수 있는 프로그램을 만드는 것이 미션의 궁극적인 목표였고 기능적인 요구사항 외에 다양한 요구사항들이 존재했다.

다양한 요구사항들 중 미션을 진행하면서 꾸준히 신경 썼던 프로그래밍 요구사항과 과제 진행 요구사항을 아래 정리해놨다.

### **💻 프로그래밍 실행 결과 예시**

---

```
자판기가 보유하고 있는 금액을 입력해 주세요.
450

자판기가 보유한 동전
500원 - 0개
100원 - 4개
50원 - 1개
10원 - 0개

상품명과 가격, 수량을 입력해 주세요.
[콜라,1500,20];[사이다,1000,10]

투입 금액을 입력해 주세요.
3000

투입 금액: 3000원
구매할 상품명을 입력해 주세요.
콜라

투입 금액: 1500원
구매할 상품명을 입력해 주세요.
사이다

투입 금액: 500원
잔돈
100원 - 4개
50원 - 1개
```

### **🎱 프로그래밍 요구사항**

---

- 자바 코드 컨벤션을 지키면서 프로그래밍한다.
    - [https://naver.github.io/hackday-conventions-java](https://naver.github.io/hackday-conventions-java)
- indent(인덴트, 들여쓰기) depth를 3이 넘지 않도록 구현한다. 2까지만 허용한다.
- 함수(또는 메소드)가 한 가지 일만 하도록 최대한 작게 만들어라.
- else 예약어를 쓰지 않는다.
    - 힌트: if 조건절에서 값을 return하는 방식으로 구현하면 else를 사용하지 않아도 된다.
    - else를 쓰지 말라고 하니 switch/case로 구현하는 경우가 있는데 switch/case도 허용하지 않는다.

### **프로그래밍 요구사항 - Coin**

- Coin 클래스를 활용해 구현해야 한다.
- 필드(인스턴스 변수)인 `amount`의 접근 제어자 private을 변경할 수 없다.

```java
public enum Coin {
    COIN_500(500),
    COIN_100(100),
    COIN_50(50),
    COIN_10(10);

    private final int amount;

    Coin(final int amount) {
        this.amount = amount;
    }

    // 추가 기능 구현
}
```

### **📈 과제 진행 요구사항**

---

- **기능을 구현하기 전에 java-baseball-precourse/README.md 파일에 구현할 기능 목록을 정리**해 추가한다.
- **Git의 커밋 단위는 앞 단계에서 README.md 파일에 정리한 기능 목록 단위**로 추가한다.
    - [AngularJS Commit Message Conventions](https://gist.github.com/stephenparish/9941e89d80e2bc58a153) 참고해 commit log를 남긴다.

<br>

## **🖋 3주차 미션 후기**

---

### **README 작성**

---

1주차, 2주차 피드백 모두에서 언급된 만큼 3주간 미션 내내 신경 썼던 부분이다.

1주차 피드백을 받은 시점인 2번째 미션에서도 README 는 그렇게 완벽하지 못했던 것 같다.

기능 목록을 작성한다는 행위 자체가 시작 전부터 완벽한 설계를 하고 들어가야 한다는 강박을 들게 했던 것 같다.

결론적으로 말하자면 처음부터 너무 완벽하지 않아도 되고 애초에 완벽할 수 없다.

2주차 회고에서도 언급했듯이 완벽하다고 생각했던 문서는 기능을 구현하다 보면 개선점이나 추가사항들이 눈에 들어오기 마련이다.

중간중간 수정하는 행위를 두려워하지 말고 **살아 있는 문서** 를 만드는데 집중하는 게 좋은 것 같다.

이번 과제에서는 2주차와 다르게 정말 이 프로그램을 작동시키는 데 있어서 필요한 기능들을 생각하며 기능 목록을 정리했다.

특히 **정상적인 경우도 중요하지만, 예외적인 상황도 기능 목록에 정리**하는 게 굉장히 중요하다는 점을 느꼈다.

전체적인 흐름으로 틀을 잡아놓고 기능을 구현하다 보면 미처 생각하지 못했던 예외 케이스들이 하나씩 눈에 보이기 시작한다.

이번엔 마크다운 문법을 활용하여 README 에 체크박스를 생성하고 그때그때 생각나는 기능들을 따로 정리해 두었다가 현재 구현하던 기능이 마무리되면 추가하는 방식으로 미션을 진행했다.

이런 흐름의 프로그래밍 연습을 꾸준히 하다 보면 자연스럽게 실력이 향상될 것 같다.

### **가독성**

---

1, 2주차 피드백을 보면 코드 가독성에 대한 간접적인 언급이 상당히 많았다.

그 중 하드 코딩을 지양하라는 피드백이 있었는데 이는 상수화를 통해 매직 넘버를 피하고 변수의 역할과 의도를 드러내게 하라는 의도였다.

```java
private static final int NAME = 0;
private static final int PRICE = 1;
private static final int QUANTITY = 2;

public void initializeItems(String input) {
		this.items = new Items();
		List<String> itemsInfo = ItemValidator.isValidItems(input);
		for (String itemInfo : itemsInfo) {
			List<String> detail = ItemValidator.isValidItem(itemInfo);
			items.add(new Item(detail.get(NAME), detail.get(PRICE), detail.get(QUANTITY)));
		}
	}
```

단적인 예로 상품 목록을 입력받을 때 각 목록의 상품명, 가격, 수량 인덱스로 접근해야 할 때 `detail.get(0)` `detail.get(1)` `detail.get(2)` 보다

`detail.get(NAME)` `detail.get(PRICE)` `detail.get(QUANTITY)` 가 더 명확하다는 것을 알 수 있다.

또 다른 피드백 중 축약을 지양하라는 피드백 역시 2주 연속으로 언급되었다.

따라서 이번 미션에선 의도를 드러내기 위해 메서드나 변수의 이름을 줄이기보단 좀 더 문장을 쓴다는 생각으로 코드를 작성했다.

```java
public class VendingMachineController {
	public void run() {
		VendingMachine vendingMachine = new VendingMachine();  // 자판기를 생성

		initializeCoins(vendingMachine);  // 자판기가 보유할 동전 목록 생성
		OutputView.showCoins(vendingMachine);  // 생성된 동전 목록 출력
		initializeItems(vendingMachine);  // 자판기가 판매할 상품 목록 생성
		initializeBalance(vendingMachine);  // 사용자가 투입한 금액을 자판기에 생성

		while (vendingMachine.isAvailable()) {  // 자판기 사용 가능 시
			OutputView.showBalance(vendingMachine);  // 잔액 출력
			executePurchase(vendingMachine);  // 구매 실행
		}
		OutputView.showBalance(vendingMachine);  // 잔액 출력
		OutputView.showChanges(vendingMachine);  // 잔돈 출력
	}
```

처음 `README` 로 작성한 기능 목록대로 프로그램의 흐름대로 코드를 문장을 쓰듯이 작성했다.

내부적인 기능을 나중으로 미뤄두고 전체적인 흐름이 이런 식일 것 같다는 방향을 갖고 코드를 작성하니 똑똑한 IntelliJ 가 어느 부분에 메서드가 구현되어 있지 않은지 친절히 알려줬다.

미구현 상태의 메서드들을 `Alt + Enter` 로 간단하게 생성하고 해당 문맥에 필요한 기능들을 차근차근 구현해 나갔다.

위와 같은 방향으로 프로그램을 구현하니 확실히 속도도 빠르고 필요한 부분들을 명확하게 알 수 있었다.

### **MVC 패턴 적용**

---

2주차 미션에 이어 이번 미션에서도 MVC 패턴을 적용하여 구현해보려고 노력했다.

특히 피드백에서 언급된 비즈니스 로직과 UI 로직 분리에 신경을 많이 썼는데 저번 과제에서의 경험 덕분인지 자판기 구조가 명확한 탓인지 이번 과제에서의 구조 설계는 생각보다 수월했던 것 같다.

구조 설계에서 헤매고 있던 나에게 [세상에서 제일 쉬운 MVC 패턴](https://log.hodol.dev/techcourse/mvc-pattern#mvc-3) 은 MVC 패턴이라는 개념을 이해하는 데 상당히 큰 도움이 되었다.

프리코스를 통해 처음 MVC 패턴을 접해본 사람들은 꼭 읽어볼 것을 추천한다.

자판기 기능을 구현하기 위해선 자판기라는 객체가 필요할 것으로 생각했고 자판기는 아래 코드와 같이 동전 목록, 상품 목록, 투입 금액을 인스턴스 변수로 갖고 있을 것임을 알 수 있었다.

```java
public class VendingMachine {
	private Coins coins;  // 동전 객체를 포함하고 있는 동전 목록 객체
	private Items items;  // 상품 객체를 포함하고 있는 상품 목록 객체
	private Balance balance;  // 사용자가 투입한 금액 객체
```

2주차 과제를 진행하며 배운 일급 컬렉션 개념을 적용하여 아래와 같은 목록 객체들을 만들었고 해당 프로그램에서 필요한 기능을 구현할 때마다 직관적으로 객체를 참조하여 활용할 수 있었다.

일급 컬렉션이 처음이라면 [일급 컬렉션 (First Class Collection)의 소개와 써야할 이유](https://jojoldu.tistory.com/412) 를 꼭 읽어볼 것을 추천한다.

```java
// 동전 상수들의 집합
public enum Coin {
	COIN_500(500),
	COIN_100(100),
	COIN_50(50),
	COIN_10(10);

	private final int amount;

	Coin(final int amount) {
		this.amount = amount;
	}

// 동전 목록
public class Coins {
	private int coinBalance;
	private final Map<Coin, Integer> changeCoins = new LinkedHashMap<>();
```

```java
// 상품 객체
public class Item {
	private final String name;
	private final int price;
	private int quantity;

// 상품 목록
public class Items {
	private final List<Item> itemList = new ArrayList<>();
```

이와 같은 구조로 객체를 설계하니 각자의 역할에 맞춰 필드의 수가 정해졌고 불필요한 인스턴스 변수는 자연스럽게 줄어들었다.

객체마다 역할을 주니 해당 객체가 책임질 수 있는 기능을 객체에 메시지를 보냄으로써 다른 객체가 해당 객체의 내부 정보를 알지 않아도 원하는 기능을 구현할 수 있었다.

```java
public class VendingMachine {
	public void initializeCoins(String input) {
		int coinBalance = BalanceValidator.isValidBalance(input);
		this.coins = new Coins(coinBalance);
		coins.createRandomCoins();
	}
```

한 예로 자판기가 `500원, 100원, 50원, 10원` 중 무작위로 잔돈을 설정해야 할 때 `vendingMachine` 이 직접 하지 않고 `coins` 에게 메시지를 보냄으로써 `coins` 내부에서 생성한 무작위 동전 목록을 `vendingMachine` 에게 전달할 수 있다.

### **Java API, Collections 적극 활용**

---

피드백에서 언급되었듯이 이번 과제에서는 Java 에서 제공하는 API 와 Collections 를 적극 활용하려고 노력했다.

특히 Map 자료구조를 자주 활용할 수 있었는데 `LinkedHashMap` 을 통한 동전 목록과 잔돈 목록 순서 유지나 `entrySet` 을 통한 요소 조회에 상당한 이점을 취할 수 있었다.

이외에도 [자바 정규식(Regular Expression) 사용하기](https://offbyone.tistory.com/400) 등 다양한 블로그를 통해 정규표현식이라는 새로운 개념을 배워 상품명 입력 시 발생할 수 있는 서식 에러를 손 쉽게 처리할 수 있었다.

작성한 정규표현식의 범위를 확인하기 위해 [RegExr](https://regexr.com/) 와 같은 사이트를 이용하면 손쉽게 원하는 패턴을 만들어낼 수 있었다.

### **잔돈 반환 알고리즘**

---

이번 과제에서는 그리디 알고리즘이라고도 많이 알려진 거스름돈 반환 기능이 필수적으로 필요했고 전형적인 거스름돈 반환과는 달리 **반환할 수 있는 만큼** 이라는 조건을 만족한 채로 알고리즘을 설계해야 했다.

```java
public Map<Coin, Integer> getChangeableCoins(Balance balance) {
	for (Map.Entry<Coin, Integer> coin : changeCoins.entrySet()) {
		updateCoinStatus(coin, balance);
	}
	return changeableCoins;
}

private void updateCoinStatus(Map.Entry<Coin, Integer> coin, Balance balance) {
	while (balance.canBuy(coin.getKey().getAmount()) && coin.getValue() > EMPTY) {
		balance.reduceBalance(coin.getKey().getAmount());
		if (changeableCoins.containsKey(coin.getKey())) {
			changeableCoins.replace(coin.getKey(), changeableCoins.get(coin.getKey()) + QUANTITY);
			changeCoins.replace(coin.getKey(), coin.getValue() - QUANTITY);
			continue;
		}
		changeableCoins.put(coin.getKey(), QUANTITY);
		changeCoins.replace(coin.getKey(), coin.getValue() - QUANTITY);
	}
}
```

기존에 무작위로 배분했던 동전 목록인 `changeCoins` 를 순회하면서 현재 조회 중인 동전이 잔액보다 작을 때 잔액을 차감시키고 해당 동전을 잔돈 목록인 `changeableCoins` 로 넘기는 작업을 반복하도록 설계하였다.

이 경우 **가장 적은 개수의 동전**으로 잔돈을 만들어낼 수 있고 동전이 부족할 경우 **반환할 수 있는 만큼**의 잔액을 반환할 수 있다.

잔돈 반환을 실행하게 되는 로직 중 한 가지 의문을 들게 하였던 기능 요구사항이 있었다.

`남은 금액이 상품의 최저 가격보다 적거나, 모든 상품이 소진된 경우 바로 잔돈을 돌려준다.`

잔액이 상품 최소 금액보다 크지만, 해당 상품이 품절이라면?

예를 들어 잔액이 1,100원 남은 상태에서 가장 싼 물품인 1,000원 짜리 사이다가 품절이고 살 수 있는 물건은 1,500원 짜리 콜라뿐일 때 살 수 있는 물건이 없는데 잔돈을 반환하지 않는다는 건 오류라고 생각했다.

따라서 위 기능 요구사항을 아래와 같이 새롭게 정의하여 기능을 구현했다.

`남은 금액이 남아있는 상품의 최저 가격보다 적을 경우 바로 잔돈을 돌려준다.`

위 논리대로 자판기를 실행하면 잔액으로 살 수 있는 물품이 없을 때 바로 잔돈을 반환하도록 설계할 수 있었다.

```java
public int getExistingCheapest() {
	List<Integer> existingPriceList = new ArrayList<>();
	for (Item item : itemList) {
		if (item.exists()) {
			existingPriceList.add(item.getPrice());
		}
	}
	return Collections.min(existingPriceList);
}
```

해당 기능을 수행하기 위해 수량이 남은 물건 중 가장 싼 제품을 구하는 메서드를 구현했다.

하지만 이 메서드 역시 예외 상황이 발생할 수 있었다.

만약 모든 물건이 품절이라면?

`existingPriceList` 이 `NoSuchElementException` 을 발생시켜 프로그램이 비정상 종료될 수 있다.

```java
public int getExistingCheapest() {
	List<Integer> existingPriceList = new ArrayList<>(Collections.singletonList((int)2e9));
```

따라서 위와 같이 `int` 자료형에서 무한대를 의미하는 `2e9` 값을 `existingPriceList` 와 같이 초기화해줌으로써 모든 상품이 품절일 경우 `getExistingCheapest()` 가 잔액보다 항상 큰 `2e9` 를 반환하게끔 하여 잔돈 반환 알고리즘을 수행할 수 있도록 설계하였다.

이로써 `getExistingCheapest()` 하나의 메서드로 잔액이 최소 금액보다 작을 경우와 모두 품절일 경우를 동시에 확인할 수 있게 하여 두 가지 예외 상황을 모두 해결할 수 있었다.