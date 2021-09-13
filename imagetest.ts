function isValidHttpUrl(input: string){
    let url : URL;
    try{
        url = new URL(input);
    } catch(_){
        return false;
    }
    return input;
}

function loadImage(){
    const urlBox = document.getElementById("urlBox");
    if(!(urlBox instanceof HTMLInputElement)){
        throw new Error("urlBox is not a HTMLInputElement");
    }
    let url = isValidHttpUrl(urlBox.value);
    if(!url){
        window.alert("有効なurlではありません");
        return;
    }
    let img = new Image();
    img.src = url;

    img.onload = function(){
        let canvas = document.getElementById('canvas');
        if(!(canvas instanceof HTMLCanvasElement)){
            throw new Error("canvas is not a HTMLCanvasElement"); 
        }
        let context = canvas.getContext("2d"); 
        context.imageSmoothingEnabled = false;
        context.drawImage(img,0,0,180,120);
    }
    img.onerror = function (){
        window.alert("画像の読み込みに失敗しました");
    }
}
function loadImage2(){
    const fileBox = document.getElementById('fileBox');
    if(!(fileBox instanceof HTMLInputElement)){
        throw new Error("fileBox is not a HTMLInputElement");
    }
    let img = new Image();
    img.src = fileBox.value;
    img.onload = function(){
        let canvas2 = document.getElementById('canvas2');
        if(!(canvas2 instanceof HTMLCanvasElement)){
            throw new Error("canvas is not a HTMLCanvasElement"); 
        }
        let context = canvas2.getContext("2d"); 
        context.imageSmoothingEnabled = false;
        context.drawImage(img,0,0,1800,1200);
        
        for(let x = 0;x<180;x++){
            context.beginPath();
            context.moveTo(x*10,0);
            context.lineTo(x*10,1200);
            context.stroke();
        }
        for(let y = 0;y<120;y++){
            context.beginPath();
            context.moveTo(0,y * 10);
            context.lineTo(1800,y * 10);
            context.stroke();
        }

        context.beginPath();
        context.moveTo(1800,0);
        context.lineTo(1800,1200);
        context.stroke();

        context.beginPath();
        context.moveTo(0,1200);
        context.lineTo(1800,1200);
        context.stroke();
    }
    img.onerror = function (){
        window.alert("画像の読み込みに失敗しました");
    }
}