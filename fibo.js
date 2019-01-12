const fibonacci = function (inWhatever){
    if (typeof inWhatever == "number"){
        let numb1 = 0;
        let numb2 = 1;
        let numb3 = numb1 + numb2;
        let seriesFibo = [];

        seriesFibo.push(numb1, numb2, numb3);

        while (numb3 < inWhatever){
            numb1 = numb2;
            numb2 = numb3;
            numb3 = numb1 + numb2;

            seriesFibo.push(numb3);
            console.log(seriesFibo);
            if ( seriesFibo.indexOf(inWhatever) == -1){
                console.log("The number isn´t part of Fibonacci series")
            } else { console.log(seriesFibo.indexOf(inWhatever)+1) };
        }
    } else { console.log("Not a Number, NaN") }
}
fibonacci(3);
fibonacci(6);
fibonacci(610);
fibonacci(13500);
fibonacci(4181);
fibonacci("=P");
