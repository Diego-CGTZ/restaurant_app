import { sum } from "../sum"

test("La suma de dos numeros: 2 y 3 debe de dar 5", ()=>{
    expect(sum(2,3)).toBe(5);
})