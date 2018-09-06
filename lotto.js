/********************
 * 로또 번호 생성기
 ********************
 *  [requirements]
 *  - 로또 1장의 가격은 1000원이다.
 *  - 돈을 넣으면 살 수 있는 만큼 로또를 구매할 수 있다. (buyLottos 함수)
 *  - 각 로또 번호는 6개다.
 */

const numbersOfLotto = 6;
let inputMoney = 0;
const lottos = [];
const minNumber = 1;
const maxNumber = 45;

/**
 *  입력한 돈만큼 로또를 구입하는 함수 
 *  @param {Number} money - 입력한 돈
 */
const buyLottos = (money) => {
  const lottoPrice = 1000;
  inputMoney = money;
  // 구매할 수 있는 로또 수 
  const countOfLottos = Math.floor(money / lottoPrice);
  console.log('countOfLottos:', countOfLottos);
  publishLotto(countOfLottos);
};

/**
 *  랜덤으로 로또 번호 수만큼의 숫자를 추출하는 함수
 *  @param {Number} count - 구매할 로또의 수 
 */
const publishLotto = (count) => {
  for(let i=0; i < count; i++) {
    lottos.push(getRandomNumbers());
  };
  console.log('발급된 로또:', lottos);
  console.log('당첨 숫자를 입력해주세요. ex) setLuckyNumber([1, 2, 3, 4, 5, 6])');
};

/**
 *  랜덤으로 numbersOfLotto 수만큼 랜덤으로 숫자를 추출하는 함수  
 */
const getRandomNumbers = () => {
  let lotto = [];
  for(let i=0; i < numbersOfLotto; i++) {
    let number = extractRandomNumber();
    // 중복된 숫자를 뽑은 경우 다시 추첨
    if (lotto.includes(number)) {
      i--;
    } else {
      lotto.push(number);
    }
  };
  return lotto;
};

/**
 *  랜덤으로 minNumber와 maxNumber 사이의 정수를 뽑는 함수 
 */
const extractRandomNumber = () => {
  return Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;
}

/**
 *  당첨 숫자를 설정하는 함수 
 *  @param {Array} numbers - 당첨 번호 
 */
const setLuckyNumber = (numbers) => {
  if (Array.isArray(numbers)) {
    // 중복 숫자 제거, 입력된 숫자가 최소값(minNumber), 최대값(maxNumber)를 충족하는지 비교 
    const filteredNumbers = numbers.filter((number, idx, arr) => {
      return arr.indexOf(number) === idx && number >= minNumber && number <= maxNumber
    });
    if (filteredNumbers.length === numbersOfLotto) {
      console.log('당첨 번호:', numbers);
      checkLottos(numbers);
    } else {
      console.log('1~45 사이의 중복되지 않은 숫자로 구성된 배열을 입력해주세요.');
    }
  } else {
    console.log(`${numbersOfLotto}개의 숫자로 구성된 배열 형식으로 입력해주세요.`);
  }
};

/**
 *  당첨 여부를 확인하는 함수 
 */
const checkLottos = (luckyNumbers) => {
  const results = [];
  lottos.forEach((lotto) => {
    let result = lotto.filter(number => luckyNumbers.includes(number));
    results.push(result.length);
  })
  console.log('숫자 매칭 결과:', results);
  countWin(results);
};

/**
 *  매칭 결과를 바탕으로 당첨 통계를 계산하는 함수 
 *  @param {Array} array - 매칭 결과
 */
const countWin = (array) => {
  const statistics = {
    prize: {
      0: 0,
      1: 0,
      2: 0,
      3: 5000,
      4: 50000,
      5: 1500000,
      6: 2000000000
    }
  };
  // 숫자 몇 개를 맞췄는지 계산
  statistics['count'] = array.reduce((prev, curr) => (prev[curr] = ++prev[curr] || 1, prev), {});
  // 총 수익 계산
  let total = 0;
  for (key in statistics.count) {
    total += statistics.count[key] * statistics.prize[key];
  }
  // 수익률 계산
  statistics['rateOfReturn'] = ((total - inputMoney) / inputMoney) * 100;
  printResults(statistics);
};

/**
 *  당첨 통계를 출력하는 함수 
 */
const printResults = (statistics) => {
  console.log(`당첨 통계 
3개 일치 (5000원) - ${statistics.count[3] || 0}개
4개 일치 (50000원)- ${statistics.count[4] || 0}개
5개 일치 (1500000원)- ${statistics.count[5] || 0}개
6개 일치 (2000000000원)- ${statistics.count[6] || 0}개
나의 수익률은 ${statistics.rateOfReturn}%입니다.
  `);
}

buyLottos(20000);