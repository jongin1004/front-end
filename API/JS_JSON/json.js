// JSON(JavaScript Object Notation)

// 1. Object -> JSON
// stringify(obj)
let json = JSON.stringify(true);
console.log(json);

json = JSON.stringify(['apple', 'banana']);

 rabbit = {
    name: 'tori',
    color: 'white',
    size: null,
    birthDate: new Date(),
    jump: () => {
        console.log(`${name} can jump!`);
    },
};

// rabbit오브젝트에 있는 jump라는 함수는, console.log에 출력이 안된다. 
// 함수는 오브젝트에 있는 데이터가 아니기 때문
// JS의 symbol같이 JS만 존재하는 것도 JSON에서는 출력이 안된다.
json = JSON.stringify(rabbit);
console.log(json);

// stringify함수에 replacer이라는 콜백함수를 이용해서 좀 더 세세한 설저을 할 수 있다.
// rabbit 오브젝트에서 특정 속성만 JSON으로 변환하고 싶을 경우
json = JSON.stringify(rabbit, ['name', 'color']);
console.log(json);

// rabbit오브젝트의 key와 value값을 출력하도록 하는데,
// console.log를 살펴보면, 최상위의 rabbit오브젝트 값도 출력되는 것을 확인 할 ㅅ ㅜ있다. 
json = JSON.stringify(rabbit, (key, value) => {
    console.log(`key: ${key}, value: ${value}`);
    return value;
    // key가 name일 경우에는 name의 value를 jongin으로, 아닌 경우에는 그냥 value가 출력
    // return key === 'name' ? 'jongin' : value;
});
console.log(json);


// 2. JSON -> Object 
// parse(json)
    