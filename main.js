//시스템바 불러오기
const helpButton = document.querySelector(".helpButton");
const cash = document.querySelector(".cash");
const store = document.querySelector(".helpButton+button");

//아웃풋 불러오기
const output = document.querySelector("#output");

//프롬프트 불러오기
const typeCode = document.querySelector("#typeCode");
const run = document.querySelector("#run");

//환경변수 정의
let server = false;
let serverLoad = 0;
let level = 1;
let hackingTool = false;
let myCash = 50;
let serverCash = 10;
let loop = false;
let loopNumber = 0;
let commend = "";
let numberN = 0;
let crashing = false;
let crashingKey = false;
let crash = 0;
let key = 0;
let pass = false;
let passHigh = false;
let Store = false;

//function정의
function messge() {
    alert("Please read to README file.");
}

function error() {
    alert("Holy shit! Error!");
}

function Output(text) {
    output.innerText = text;
}

function newKey() {
    key = Math.floor(Math.random() * 10 + 1);
    //Math.random 0~1 사이의 난수 생성
    //Math.floor 소수점을 내림시켜 정수로 만듦
}

function openStore() {
    Store = true;
    Output("Please write the command to purchase.");
}

function closeStore() {
    Store = false;
}

function Run() {
    commend = typeCode.value;

    // 서버가 활성화 된 경우
    if(Store){
        if(commend=="pass"){
            if(myCash>=50){
                Output("I have enough cash.");
                myCash -= 50;
                pass = true;
                closeStore();
                cash.innerText = "cash : " + myCash;
            } else{
                error();
                closeStore();
                Output("You don't have enough cash!");
            }
        }else if(commend=="passHigh"){
            if(myCash>=200){
                Output("I have enough cash.");
                myCash -= 200;
                pass = false;
                passHigh = true;
                closeStore();
                cash.innerText = "cash : " + myCash;
            } else{
                error();
                closeStore();
                Output("You don't have enough cash!");
            }
        }else {
            error();
        }
    }else if (server) {
        if (commend == "level") {
            Output(level.toString());
        } else if (commend == "crash") {
            // level이 1 이상일 때만 crash 명령어 실행
            if (level > 1) {
                crashingKey = true;
                crash = 0;
                newKey();
                Output("Write down password.");
            } else {
                // level이 1이면 crash 명령어를 사용할 수 없고, 에러 처리
                error();
            }
        } else if (crashingKey) {
            numberN = Number(commend);

            // 비밀번호 입력 처리
            if (isNaN(numberN)) {
                if (commend == "password") {
                    Output(key.toString());
                } else if(pass){
                    if(commend=="pass"){
                        crashingKey = false;
                        crashing = true;
                        Output("Write down your current level");
                    } else{
                        error();
                    }
                }else if(passHigh){
                    if(commend=="passHigh"){
                        crashingKey = false;
                        crashing = false;
                        level -= 1;
                        Output("Complate!")
                    } else{
                        error();
                    }
                }else {
                    error();
                }
            }else {
                crash = numberN;
                if (key == numberN) {
                    crashing = true;
                    crashingKey = false;
                    Output("Write down your current level");
                } else {
                    Output("It's not password");
                }
            }
        } else if (crashing) {
            numberN = Number(commend);

            // level을 입력받고 비교 처리
            if (isNaN(numberN)) {
                if (commend == "level") {
                    Output(level.toString());
                } else {
                    error();
                }
            } else {
                crash = numberN;
                if (level == numberN) {
                    // `crash` 완료 후 레벨 1 감소
                    level -= 1; // 레벨 1 감소
                    crashing = false;
                    crashingKey = false;
                    Output("Complete!");
                } else {
                    Output("This is not this level");
                }
            }
        }else if (level == 1) {
            if (commend == "hack") {
                hackingTool = true;
                Output("We planted a hacking tool!!");
            } else if (commend == "get") {
                if(hackingTool){
                    myCash += serverCash;
                    serverCash = 0;
                    server = false;
                    serverLoad = 0;
                    Output("I don't need this server anymore, so I'll throw it away.");
                    cash.innerText = "Cash : " + myCash;
                }else{
                    error();
                }
            } else{
                error();
            }
        }else{
            error();
        }
    } else {
        if (serverLoad == 0) {
            if (commend == "server") {
                serverCash = 9;
                serverLoad = 1;
                Output("Good! Write down your level quickly!");
            } else {
                error();
            }
        } else if (serverLoad == 1) {
            numberN = Number(commend);

            if (isNaN(numberN)) {
                error();
            } else {
                if (numberN > 0) {
                    serverLoad = 0;
                    server = true;
                    level = Math.floor(numberN);
                    serverCash += level;
                    Output("Server connection complete!");
                } else {
                    error();
                }
            }
        }
    }
}

//이벤트 리스너
helpButton.addEventListener("click", messge);

//`Enter`키 처리 - 페이지 새로고침 방지 및 Run 함수 실행
typeCode.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();  // 기본 동작인 새로고침 방지
        Run();  // Run 함수 호출
    }
});

run.addEventListener("click", Run);
store.addEventListener("click", openStore);