function ValidateName()
{
    
    var namearr=document.loanform.fullName.value.split(" ")
    if(namearr.length>=2){
        var nameformat = /^[A-Za-z\s]+$/;
        if(document.loanform.fullName.value.match(nameformat))
        {
            var count=0;
            for(var x=0;x<namearr.length;x++){
                if(namearr[x].length<4){
                    document.getElementById("NameErrorLbl").innerText="Full name should contain at least four characters each "
                    document.loanform.fullName.focus();
                    count++;
                     break;
                }
            }
           if(count==0){
            document.getElementById("NameErrorLbl").innerText="";
            document.loanform.fullName.focus();
           }
            
            return true;
        }
        else
        {
            document.getElementById("NameErrorLbl").innerText="Please use only aplphabets"
            document.loanform.fullName.focus();
            return false;
        }
    }
    else if(namearr.length<2){
        
        document.getElementById("NameErrorLbl").innerText="Minimun two words required from your full name";
    }
    else{
        
    }
    
}


function ValidateEmail()
{
    
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(document.loanform.email.value.match(mailformat))
    {
        document.getElementById("emailErrorLbl").innerText="";
        document.loanform.email.focus();
        return true;
    }
    else
    {
        document.getElementById("emailErrorLbl").innerText="You have entered an invalid email address!"
        document.loanform.email.focus();
        return false;
    }
}


function ValidatePAN()
{
    
    var panformat =  /[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    if(document.loanform.pan.value.match(panformat))
    {
        document.getElementById("PanErrorLabel").innerText="";
        document.loanform.pan.focus();
        return true;
    }
    else
    {
        document.getElementById("PanErrorLabel").innerText="You have entered an invalid PAN number!"
        document.loanform.pan.focus();
        return false;
    }
}

function LoanAmount()
{
        var loanformat =  /^\d{9}$/;
        if(document.loanform.loan.value.match(loanformat))
        {
            document.getElementById("LoanErrorLabel").innerText="";
            document.loanform.loan.focus();
            return true;

        }      
        else
        {
            document.getElementById("LoanErrorLabel").innerText="Only nine digit numbers allowed"
            document.loanform.loan.focus();
            return false;
        }
}

var a = ['','one ','two ','three ','four ', 'five ','six ','seven ','eight ','nine ','ten ','eleven ','twelve ','thirteen ','fourteen ','fifteen ','sixteen ','seventeen ','eighteen ','nineteen '];
var b = ['', '', 'twenty','thirty','forty','fifty', 'sixty','seventy','eighty','ninety'];

function inWords (num) {
    if ((num = num.toString()).length > 9) return 'Nine digit limit exceeded';
    n = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
    if (!n) return; var str = '';
    str += (n[1] != 0) ? (a[Number(n[1])] || b[n[1][0]] + ' ' + a[n[1][1]]) + 'crore ' : '';
    str += (n[2] != 0) ? (a[Number(n[2])] || b[n[2][0]] + ' ' + a[n[2][1]]) + 'lakh ' : '';
    str += (n[3] != 0) ? (a[Number(n[3])] || b[n[3][0]] + ' ' + a[n[3][1]]) + 'thousand ' : '';
    str += (n[4] != 0) ? (a[Number(n[4])] || b[n[4][0]] + ' ' + a[n[4][1]]) + 'hundred ' : '';
    str += (n[5] != 0) ? ((str != '') ? 'and ' : '') + (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]]) + 'only ' : '';
    return str;
}

    document.getElementById('loan').onkeyup = function () {
    document.getElementById('LoanErrorLabel').innerHTML = inWords(document.getElementById('loan').value);
    document.getElementById('LoanErrorLabel').style.color = "black";
};

function gen_captcha()
{
    // console.log(Math)
    //console.log(Math.random())
    document.querySelector("#capmsg").innerHTML=" ";
    document.querySelector("#txt").value="";
    data1 = Math.round(10 * Math.random());
    console.log(data1)
    data2 = Math.round(10 * Math.random());
    console.log(data2)

    str = `Enter: ${data1} + ${data2}`
    console.log(str);
    document.querySelector("#captcha").innerHTML=str;
    sum =data1+data2
    console.log(sum)
}
let validate_captcha=false;
function check_captcha(){
    rec =document.querySelector("#txt").value;
    console.log(rec);
    if(rec==sum){
        console.log("Valid captcha")
        str1 = `Valid Cpatcha`
        document.querySelector("#capmsg").innerHTML=str1;
        document.querySelector("#capmsg").style.color="green";

        validate_captcha=true;
    }
    else{
        str2 = `InValid Cpatcha`
       document.querySelector("#capmsg").innerHTML=str2;
    }
}

function gen_otp(){
     
    otp = Math.round(10000 * Math.random());
    console.log(otp)
    
}

function submit_loan_appln(){
    var error_count=0;
    if(document.loanform.fullName.value==""){
        document.querySelector("#NameErrorLbl").innerHTML="Please enter full name";
        document.getElementById('NameErrorLbl').style.color = "red";
        error_count+=1;
    }

    if(document.loanform.email.value==""){
        document.querySelector("#emailErrorLbl").innerHTML="Please enter email";
        document.getElementById('emailErrorLbl').style.color = "red";
        error_count+=1;
    }

    if(document.loanform.pan.value==""){
        document.querySelector("#PanErrorLabel").innerHTML="Please enter PAN number";
        document.getElementById('PanErrorLabel').style.color = "red";
        error_count+=1;
    }
    if(document.loanform.loan.value==""){
        document.querySelector("#LoanErrorLabel").innerHTML="Please enter loan amount";
        document.getElementById('LoanErrorLabel').style.color = "red";
        error_count+=1;
    }
    
    if(validate_captcha==false){
        document.querySelector("#capmsg").innerHTML="Please validate captcha before submit";
        document.getElementById('capmsg').style.color = "red";
        error_count+=1;
    }

    if(error_count>0){
        return;
    }
    


    var loan_data={
        fullName:document.loanform.fullName.value,
        Email:document.loanform.email.value,
        PAN:document.loanform.pan.value,
        Loan_amnt:document.loanform.loan.value,
    }
    window.localStorage.setItem('loandata',JSON.stringify(loan_data));
    localStorage.setItem("mydate",Date.now())

    document.loanform.fullName.value="";
    document.loanform.email.value="";
    document.loanform.pan.value="";
    document.loanform.loan.value="";
    document.querySelector("#txt").value="";
    validate_captcha=false;
    window.location.href="thankyou.html";

}

function acces_loan_details(){
    var loan_data1=JSON.parse(window.localStorage.getItem("loandata"));
    document.getElementById("fname").innerHTML=loan_data1.fullName.split(" ")[0] +',';
    document.getElementById("email").innerHTML=loan_data1.Email;

    localStorage.setItem("invalid_otp_count",0);
}

function validate_otp(){
    
    enterd_otp=document.getElementById("otp_txt").value;
    if(otp===Number(enterd_otp)){
        localStorage.setItem("invalid_otp_count",0);
        document.getElementById("otp_msg").innerHTML="Validation Succesfull"
        window.location.href="http://pixel6.co/";
    }
    else{
        document.getElementById("otp_msg").innerHTML="Invalid OTP"
        document.getElementById("otp_msg").style.color="red"
       var otp_count=Number(localStorage.getItem("invalid_otp_count"));
        localStorage.setItem("invalid_otp_count",otp_count+1);
        if(localStorage.getItem("invalid_otp_count")==3){
            
            window.location.href="https://pixel6.co/portfoliokpkpkp/";
    
        }
        
    }
    
}