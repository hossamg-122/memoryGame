

document.getElementById("gameBtn").onclick = newGame;

document.getElementById("gameBtn").onmousedown = function(){
    // change the button color 
     document.getElementById("gameBtn").classList.remove("btn-success");
     document.getElementById("gameBtn").classList.add("btn-primary");
    }

document.getElementById("gameBtn").onmouseup = function(){
    // change the button color 
    document.getElementById("gameBtn").classList.add("btn-success");
    document.getElementById("gameBtn").classList.remove("btn-primary");
    }

//assign the 16 spans to a var 
var spans =  document.getElementsByTagName("span");

// declare an empty array : to be used as dual value reference
var myDblEight = [];

// declare an empty array : to be used as current index reference
var my16 = [0];

newGame();

function newGame() {
document.getElementById("gameBtn").innerHTML = "Start a new Game";  
document.getElementById("gameText").innerHTML = "";  

myDblEight=[];
my16=[0];

// for loop to push randomly unarranged numbers [from 1 to 8] concatinated by 1 or 2 in  the array
var v1;
for(v1=0;myDblEight.length<16;v1++){
    var rndm = Math.ceil(Math.random()*8);
    if(myDblEight.indexOf(rndm+"1") == -1) {
        myDblEight.push(rndm+"1");
        myDblEight.push(rndm+"2");
    }
}

// for loop to push randomly arranged numbers from 1 to 16 in the array
var v2;
for(v2=0;my16.length<16;v2++){
    var rndm = Math.ceil(Math.random()*15);
    if(my16.indexOf(rndm) == -1) {
        my16.push(rndm);
    }
}

var d;
for(d=0;d<spans.length;d++){
    spans[my16[d]].classList.remove("slow");
    spans[my16[d]].classList.remove("bg-success");
    spans[my16[d]].classList.add("child-none", "child", "bg-danger");
    spans[my16[d]].setAttribute("id", myDblEight[d]);
    spans[my16[d]].innerHTML= myDblEight[d][0];
    }
}

var s;
for(s=0;s<spans.length;s++) {
    var s = s;
    spans[s].addEventListener("click",function(s){
        var the_id = s.srcElement.id;
        // console.log(the_id);
        if(document.getElementById(the_id).classList.contains("child")){
        add_and_show(the_id);
        }
        else {
            // console.log("already discovered");
        }
    })
}

var current = [];

function add_and_show(x) {
    document.getElementById(x).classList.add("slow");
    document.getElementById(x).classList.remove("child-none");
    current.push(x);
    // console.log(current);
    check_and_edit()
}

function check_and_edit() {
    if (current.length == 2){
        var a = current[0];
        var b = current[1];
        if(a===b){
            current.pop();
            // console.log(current);
        }
        else if(a[0]===b[0]) {
            mark_as_discoverd(a,b);
            current = [];
        }
        else{
           flip_back(current[0],current[1]);
            current=[];
        }
    }
    else if (current.length<2){
        //do nothing 
    }
}

function mark_as_discoverd(a,b) {
    document.getElementById(a).classList.remove("child");
    document.getElementById(b).classList.remove("child");
    document.getElementById(a).classList.add("bg-success");
    document.getElementById(b).classList.add("bg-success");
    document.getElementById(a).classList.remove("bg-danger");
    document.getElementById(b).classList.remove("bg-danger");
    finishing_check();
}

function flip_back(a,b) {
    document.getElementById(a).classList.add("bg-warning");
    document.getElementById(b).classList.add("bg-warning");
    document.getElementById(a).classList.remove("bg-danger");
    document.getElementById(b).classList.remove("bg-danger");
    window.setTimeout(function(){
        document.getElementById(a).classList.add("child-none");
        document.getElementById(b).classList.add("child-none");
        document.getElementById(a).classList.add("bg-danger");
        document.getElementById(b).classList.add("bg-danger");
        document.getElementById(a).classList.remove("bg-warning");
        document.getElementById(b).classList.remove("bg-warning");
    
    },500)
}

function finishing_check() {
    if( document.getElementsByClassName("child").length == 0 ) {
        document.getElementById("gameBtn").innerHTML = "Play Again";
        document.getElementById("gameText").innerHTML = "You're a Winner, Good Game";
    }
}