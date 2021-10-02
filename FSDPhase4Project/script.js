
// const questions = [
//                     {q:"This is working?",a:"rahul",b:"saklklsd",c:"woewe",d:"lalala"},
//                     {q:"Which Industrial Group has highest amount of Foreign properties and Assests",a:"Adani Group",b:"Reliance Group",c:"Vendanta Group",d:"Tata Group"},
//                     {q:"Which country has Peacock as the National Bird",a:"India",b:"Cambodia",c:"Peru",d:"Cuba"},
//                     {q:"What is the best Policy?",a:"Divide and Rule",b:"Honesty",c:"Modesty",d:"Humbleness"}
//                     ];

var request = new XMLHttpRequest();
request.open("GET", "questions.json", false);
request.send(null);
const questions = JSON.parse(request.responseText);
var request = new XMLHttpRequest();
request.open("GET", "answers.json", false);
request.send(null);
const answers=JSON.parse(request.responseText);
let questionspace=document.getElementById('questionspace');
let labelfora=document.getElementById('labelfora');
let labelforb=document.getElementById('labelforb');
let labelforc=document.getElementById('labelforc');
let labelford=document.getElementById('labelford');
let count=0;
let selectedanswers=[];
let pg2elements=document.getElementsByClassName('pageno2');
let myModal=new bootstrap.Modal(document.getElementById('exampleModal'));
let finalpagemodal=new bootstrap.Modal(document.getElementById('pageno3modal'));
let reviewanswerpagemodal=new bootstrap.Modal(document.getElementById('pageno3reviewmodal'));
let myinterval;

function restarttest() {
    finalpagemodal.hide();
    reviewanswerpagemodal.hide();
    count=0;
    selectedanswers=[];
    document.getElementById('next').innerHTML='Next';
    document.getElementById('next').setAttribute('class','btn btn-outline-light');
    startpageapp();
}
function showresult() {
    reviewanswerpagemodal.hide();
    onsubmitaction();
}

function reviewtheanswers() {
    finalpagemodal.hide();
    reviewanswerpagemodal.show();
    let divelement=document.getElementById('reviewouterspace');
    let htstringgen="";
    for(x=0;x<questions.length;x++){
        let temp="";
        if(selectedanswers[x]=='a'||selectedanswers[x]=='b'||selectedanswers[x]=='c'||selectedanswers[x]=='d') 
        {temp="<ul id='reviewspace' style='border: 2px solid royalblue;box-shadow:0px 0px 10px 5px grey;'><li class='text-dark' style='font-weight: bold;'>Question "+(x+1)+" : <b>"+questions[x].q+"</b></li><li class='text-primary'>Your Answer : <b>"+questions[x][selectedanswers[x]]+"</b></li><li class='text-success'>Correct Answer : <b>"+questions[x][answers[x]]+"</b></li></ul>"}
        else {
            temp="<ul id='reviewspace' style='border: 2px solid royalblue;box-shadow:0px 0px 10px 5px grey;'><li class='text-dark' style='font-weight: bold;'>Question "+(x+1)+" : <b>"+questions[x].q+"</b></li><li class='text-primary'>Your Answer : <b>"+'Did Not Answer'+"</b></li><li class='text-success'>Correct Answer : <b>"+questions[x][answers[x]]+"</b></li></ul>"
        }
        htstringgen=htstringgen.concat(temp);
    }
    divelement.innerHTML=htstringgen;

}

function onsubmitaction() {
    window.clearInterval(myinterval);
    for(let e of pg2elements){
            e.hidden=true;
        }
    finalpagemodal.show();
    let noofwronganswers=0;
    let noofrightanswers=0;
    let noofquesanswered=0;
    let notansweredquestions=0;
    let yourscore=0;
    console.log('testing...answers.length',questions.length);
    for(let x=0;x<questions.length;x++) {
        console.log('selectedanswers[x] ',selectedanswers[x],'answers[x] ',answers[x]);
        if(selectedanswers[x]=='a') {noofquesanswered++;if(answers[x]=='a'){noofrightanswers++;}else{noofwronganswers++;}} 
        else if(selectedanswers[x]=='b') {noofquesanswered++;if(answers[x]=='b'){noofrightanswers++;}else{noofwronganswers++;}} 
        else if(selectedanswers[x]=='c') {noofquesanswered++;if(answers[x]=='c'){noofrightanswers++;}else{noofwronganswers++;}} 
        else if(selectedanswers[x]=='d') {noofquesanswered++;if(answers[x]=='d'){noofrightanswers++;}else{noofwronganswers++;}}
        else {notansweredquestions++;}
    }
    yourscore=noofrightanswers*10;
    document.getElementById('nofqans').innerHTML=noofquesanswered;
    document.getElementById('nqaright').innerHTML=noofrightanswers;
    document.getElementById('nqawrong').innerHTML=noofwronganswers;
    document.getElementById('noqansw').innerHTML=notansweredquestions;
    document.getElementById('tqsdf').innerHTML=questions.length;
    document.getElementById('yourscore').innerHTML=yourscore+'/'+questions.length*10;
}

function startthetest() {
        myModal.hide();
    for(let e of pg2elements){
            e.hidden=false;
        }
        clearselection();
        onplad();
        setscrollexactvalue();
        timerstart();

}
function startpageapp() {
    for(let e of pg2elements){
            e.hidden=true;
        }
        myModal.show();
        document.getElementById('tnoq').innerHTML=questions.length;
}

function timerstart() {
    document.getElementById('totalqs').innerHTML=questions.length;
    document.getElementById('inputtime').innerHTML='20:00';
    let ctrl=1;
    let t=new Date();
    t.setTime(0);
    t.setMinutes(20);
    t.setSeconds(00);
    myinterval=window.setInterval(() => {
        t.setTime(t.getTime()-100);
        document.getElementById('inputtime').innerHTML=t.getMinutes()+':'+t.getSeconds();
        if(t.getMinutes()==0&&t.getSeconds()==0&&t.getMilliseconds()<300) {
            console.log('Time Up!!!Auto-Submitting the test');
           // window.clearInterval(myinterval);
           onsubmitaction();
        }
        else if(t.getMinutes()<5) {
            document.getElementById('inputtime').setAttribute('class','text-danger');
            if(ctrl==2) {document.getElementById('inputtime').style.fontSize='32px'; ctrl++;}
            else if(ctrl==3) {document.getElementById('inputtime').style.fontSize='34px'; ctrl++;}
            else if(ctrl==4) {document.getElementById('inputtime').style.fontSize='36px'; ctrl++;}
            else if(ctrl==5) {document.getElementById('inputtime').style.fontSize='34px'; ctrl++;}
            else if(ctrl==6) {document.getElementById('inputtime').style.fontSize='32px'; ctrl++;}
            else if(ctrl==7) {document.getElementById('inputtime').style.fontSize='30px'; ctrl=1;}
            else{ctrl++;}
        }
        else if(t.getMinutes()<10) {document.getElementById('inputtime').setAttribute('class','text-secondary');}
        else{document.getElementById('inputtime').setAttribute('class','text-success');}
    },100);
}

function jumptoquestion(x) {
    if(x==questions.length-1) {
            getcurrentseeection();
            clearselection();
            count=x;onplad();
            document.getElementById('next').innerHTML='Submit';
            document.getElementById('next').setAttribute('class','btn btn-outline-success');
        }
        else {
            getcurrentseeection();
            clearselection();
            count=x;
            onplad();
        }

        if(count!=questions.length-1) {
        document.getElementById('next').innerHTML='Next';
        document.getElementById('next').setAttribute('class','btn btn-outline-light');
        }

        if(count==0) {
            document.getElementById('back').hidden=true;
        }
        else {
            document.getElementById('back').hidden=false;
        }

        console.log('Checking :: selectedanswers[count] ',selectedanswers[count]);
        if(selectedanswers[count]!=null) {
            console.log('Making ',selectedanswers[count] ,' visible as the selectedanswers exist');
            document.getElementById(selectedanswers[count]).checked=true;
        }
}

function tablefunctiononclick() {
    getcurrentseeection();
    setpanelforquestions();
    setquestionbuttonsproper();
}

function clearanswer() {
    selectedanswers[count]=null;
    clearselection();
    setpanelforquestions();
    setquestionbuttonsproper();
}

function setpanelforquestions() {
    let questionpaneltext='';
    document.getElementById('questionpanel').innerHTML='';
    for(let x=0;x<questions.length;x++)
    {
        questionpaneltext=questionpaneltext.concat("<a onclick='jumptoquestion("+x+")' id='qref"+x+"' class='btn btn-outline-primary'>Question "+(x+1)+" (<span style='color:yellow;'>Answered</span>)</a><hr style='color: seashell;'>");
    }
    document.getElementById('questionpanel').innerHTML=questionpaneltext;
}

function setquestionbuttonsproper() {
    document.getElementById('qref'+count).setAttribute('class','btn btn-primary disabled');
    for(let x=0;x<questions.length;x++)
    {
        if(selectedanswers[x]==null){
            document.getElementById('qref'+x).childNodes[1].innerHTML='Not Answered';
            document.getElementById('qref'+x).childNodes[1].style.color='red';
        }else {
            document.getElementById('qref'+x).childNodes[1].innerHTML='Answered';
            document.getElementById('qref'+x).childNodes[1].style.color='yellow';
        }
    }
}
function setscrollexactvalue() {
    document.getElementById('windowofquestionpanel').scrollTo(0,count*70);
}

function onplad() {
        console.log('page load function');
        document.getElementById('qno').innerHTML='Question No. '+(count+1);
        setpanelforquestions();
        setquestionbuttonsproper();
        // console.log(document.getElementById('questionpanel').innerHTML)
        questionspace.innerHTML=questions[count].q;
        labelfora.innerHTML=questions[count].a;
        labelforb.innerHTML=questions[count].b;
        labelforc.innerHTML=questions[count].c;
        labelford.innerHTML=questions[count].d;
        document.getElementById('back').hidden=true;

}
function clearselection() {
    document.getElementById('a').checked=false;
    document.getElementById('b').checked=false;
    document.getElementById('c').checked=false;
    document.getElementById('d').checked=false;
}
function getcurrentseeection() {
             if(document.getElementById('a').checked==true)
            {
                console.log('option a for question no : ',count)
                selectedanswers[count]="a";
            }
            else if(document.getElementById('b').checked==true)
            {
                console.log('option b for question no : ',count)
                selectedanswers[count]="b";
            }
            else if(document.getElementById('c').checked==true)
            {
                console.log('option c for question no : ',count)
                selectedanswers[count]="c";
            }
            else if(document.getElementById('d').checked==true)
            {
                console.log('option d for question no : ',count)
                selectedanswers[count]="d";
            }
            else {
                console.log('No Option Selected for question no : ',count)
            }
}
document.getElementById('next').addEventListener('click',()=>{

        setscrollexactvalue();
        if(count==questions.length-2) {
            getcurrentseeection();
            clearselection();
            count++;onplad();
            document.getElementById('next').innerHTML='Submit';
            document.getElementById('next').setAttribute('class','btn btn-outline-success');
        }
        else if(count==questions.length-1) {
            getcurrentseeection();
                console.log('submit action through last question submit button');
                console.log('selectedanswers = ',selectedanswers);
                console.log('answers = ',answers);
                for(let i = 0;i<=count;i++){console.log('answers['+i+']= ',answers[i]);}
                onsubmitaction();
        }
        else {
            getcurrentseeection();
            clearselection();
            count++;
            onplad();
        }

        if(count==0) {
            document.getElementById('back').hidden=true;
        }
        else {
            document.getElementById('back').hidden=false;
        }

        console.log('Checking :: selectedanswers[count] ',selectedanswers[count]);
        if(selectedanswers[count]!=null) {
            console.log('Making ',selectedanswers[count] ,' visible as the selectedanswers exist');
            document.getElementById(selectedanswers[count]).checked=true;
        }
});


document.getElementById('back').addEventListener('click',()=>{

    getcurrentseeection();
    count--;
    clearselection();
    onplad();
    setscrollexactvalue();
    if(count==0) {
            document.getElementById('back').hidden=true;
        }
    else {
            document.getElementById('back').hidden=false;
        }

    if(count!=questions.length-1) {
        document.getElementById('next').innerHTML='Next';
        document.getElementById('next').setAttribute('class','btn btn-outline-light');
    }

    console.log('Checking :: selectedanswers[count] ',selectedanswers[count]);
    if(selectedanswers[count]!=null) {
            console.log('Making ',selectedanswers[count] ,' visible as the selectedanswers exist');
            document.getElementById(selectedanswers[count]).checked=true;
        }
});