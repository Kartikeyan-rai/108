//https://teachablemachine.withgoogle.com/models/wmq7keQY9/
Webcam.set({
    height:300,
    width:350,
    image_format:'png',
    png_quality:90
});
camera=document.getElementById("camera");
Webcam.attach( '#camera' );
function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML='<img id="captured_image" src="'+data_uri+'"/>';
    });
};
console.log('ml5 version',ml5.version);
clasierfier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/wmq7keQY9/model.json',modelLoaded);
function modelLoaded(){
    console.log('model loaded');
}
function talk(){
    synth=window.speechSynthesis;
    data1="The Prediction is "+prediction_1;
    utterthis=new SpeechSynthesisUtterance(data1);
    synth.speak(utterthis);
}
function check(){
    img=document.getElementById("captured_image");
    clasierfier.classify(img,gotResult);
}
function gotResult(error,results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        prediction_1=results[0].label;
        document.getElementById("result_emotion_name_1").innerHTML=prediction_1;
        talk();
        if(prediction_1=="Best"){
            document.getElementById("update_emoji1").innerHTML="&#128077;";
            document.getElementById("result_emotion_name_1").innerHTML="Best";
        }
        if(prediction_1=="victory"){
            document.getElementById("update_emoji1").innerHTML="&#9996;";
            document.getElementById("result_emotion_name_1").innerHTML="victory";

        }
        if(prediction_1=="amazing"){
            document.getElementById("update_emoji1").innerHTML="&#128076;";
            document.getElementById("result_emotion_name_1").innerHTML="amazing";

        }

    }
}
