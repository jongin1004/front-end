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
console.clear();
//stringify를 이용해서, rabbit 오브젝트를 JSON으로 
json = JSON.stringify(rabbit);
// parse를 이용해서, JSON을 다시, Object로 변환
let obj = JSON.parse(json);
console.log(obj);
// rabbit 오브젝트에는 원래 jump()라는 함수가 존재했었음
rabbit.jump();
// 근데, obj는 rabbit 오브젝트에서 JSON으로 변환되면서, jump()는 데이터로서 
// 포함되지 않기 때문에 날라감
// jump()함수가 없는 상태에서 다시, object로 변환했기 때문에 obj에는 jump()가 존재하지 않게됨
// obj.jump();

// rabbit 오브젝트에 있는, birthDate라는 속성은 new Date()라는 오브젝트입니다.
// 그렇기 때문에 Date객체에 존재하는 함수인 getDate()를 사용하는 것이 가능
console.log(rabbit.birthDate.getDate());
// 하지만, JSON으로 변환되었다가 다시 오브젝트로 변환된 obj는 birthDatae값이
// string인채로 변화이 되어버립니다! (JSON으로 변환될 떄, birthDate가 string으로 변환되서)
// 그래서, parse의 콜백함수를 사용해서 변환을 해줘야 합니다.
obj = JSON.parse(json, (key, value) => {
    return key === 'birthDate' ? new Date(value) : value;
});

console.log(obj.birthDate.getDate());
