"use strict";
function convertImage(image) {
    var width = 180;
    var height = 120;
    var shrinkedImageUrl = createShrinkedImageUrl(image, width, height);
    var shrinkedImage = new Image();
    shrinkedImage.src = shrinkedImageUrl;
    shrinkedImage.onload = function () {
        var scaledImageUrl = scaleAndAddGridToImageUrl(shrinkedImage, width, height);
        var outputImage = document.getElementById('outputImage');
        if (!(outputImage instanceof HTMLImageElement)) {
            throw new Error('convertImage():HtmlImageElement is not a HTMLImageElement');
        }
        outputImage.src = scaledImageUrl;
        outputImage.onload = function () {
            console.log('Output finished.');
        };
    };
}
function loadImage() {
    console.log('Loading file...');
    var dataUrl = '';
    var fileInput = document.getElementById('fileInput');
    if (!(fileInput instanceof HTMLInputElement)) {
        throw new Error('fileInput is not a HTMLInputElement');
    }
    if (!(fileInput.files instanceof FileList)) {
        throw new Error('fileInput.files is not a FileList');
    }
    var file = fileInput.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
        console.log(typeof (this.result));
        if (typeof this.result !== 'string') {
            throw new Error('filereader: failed to read file.');
        }
        var dataUrl = this.result;
        var image = new Image();
        image.src = dataUrl;
        image.onload = function () {
            convertImage(image);
        };
    };
}
function createShrinkedImageUrl(image, width, height) {
    var canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    if (!(canvas instanceof HTMLCanvasElement)) {
        throw new Error("canvas is not a HTMLCanvasElement");
    }
    var context = canvas.getContext("2d");
    if (!(context instanceof CanvasRenderingContext2D)) {
        throw new Error("context is not a CanvasRenderingContext2D");
    }
    context.imageSmoothingEnabled = false;
    context.drawImage(image, 0, 0, width, height);
    return canvas.toDataURL();
}
function scaleAndAddGridToImageUrl(image, unscaledWidth, unscaledHeight) {
    var canvas2 = document.createElement('canvas');
    canvas2.width = unscaledWidth * 10;
    canvas2.height = unscaledHeight * 10;
    if (!(canvas2 instanceof HTMLCanvasElement)) {
        throw new Error("canvas is not a HTMLCanvasElement");
    }
    var context = canvas2.getContext("2d");
    if (!(context instanceof CanvasRenderingContext2D)) {
        throw new Error("context is not a CanvasRenderingContext2D");
    }
    context.imageSmoothingEnabled = false;
    context.drawImage(image, 0, 0, canvas2.width, canvas2.height);
    for (var x = 0; x < unscaledWidth; x++) {
        context.beginPath();
        context.moveTo(x * 10, 0);
        context.lineTo(x * 10, canvas2.height);
        context.stroke();
    }
    for (var y = 0; y < unscaledHeight; y++) {
        context.beginPath();
        context.moveTo(0, y * 10);
        context.lineTo(canvas2.width, y * 10);
        context.stroke();
    }
    context.beginPath();
    context.moveTo(canvas2.width, 0);
    context.lineTo(canvas2.width, canvas2.height);
    context.stroke();
    context.beginPath();
    context.moveTo(0, canvas2.height);
    context.lineTo(canvas2.width, canvas2.height);
    context.stroke();
    return canvas2.toDataURL();
}
