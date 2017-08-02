const uniqueId = 0;

export class VideoProcessor extends HTMLElement {
  private ownShadowRoot: ShadowRoot;
  private videoEl: HTMLVideoElement;
  private canvasEl: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;

  private videoId: string;
  private canvasId: string;

  static get observedAttributes() {
    return ['id'];
  }

  get id() {
    const id = this.getAttribute('id');
    return id || `video-processor-${uniqueId}`;
  }

  private permissionGranted(mediaStream: MediaStream) {
    this.videoEl = <HTMLVideoElement>this.ownShadowRoot.getElementById(this.videoId);
    this.canvasEl = <HTMLCanvasElement>this.ownShadowRoot.getElementById(this.canvasId);
    this.context = this.canvasEl.getContext('2d');
    // this.context.globalAlpha = 0.1;
    this.videoEl.hidden = true;

    this.videoEl.src = URL.createObjectURL(mediaStream);
    this.videoEl.oncanplay = () => this.displayOntheCanvas();
    this.videoEl.play();

  }

  private displayOntheCanvas() {
    
    const height = this.videoEl.videoHeight;
    const width = this.videoEl.videoWidth;
    console.log(width, height);
    this.canvasEl.width = width;
    this.canvasEl.height = height;

    this.context.drawImage(this.videoEl, 0, 0, width, height);
    const pixels = this.context.getImageData(0, 0, width, height);
    //now we can work with those pixels.data each pixel represented by rgba(255, 255, 255, 255);
    //and then puth them back
    // this.context.putImageData(pixels, 0, 0);
    requestAnimationFrame(()=>this.displayOntheCanvas());
  }

  connectedCallback() {
    this.ownShadowRoot = this.attachShadow({ mode: 'open' });
    this.render();
    navigator.mediaDevices.getUserMedia({ video: true, audio: false })
      .then((localMediaStream: MediaStream) => this.permissionGranted(localMediaStream))
      .catch(() => { });
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (this.id !== newValue) {
      this.setAttribute('id', this.id);
    }
  }

  render() {
    this.canvasId = `${this.id}-canvas`;
    this.videoId = `${this.id}-video`;
    this.ownShadowRoot.innerHTML = `
      <style>
        :host{
          display: flex;
          align-items: center;
          justify-content: center;
        }

      </style>
      <canvas id=${this.canvasId}></canvas>
      <video id=${this.videoId}></video>
    `;
  }
}

export const videoProcessorInitializer = () => {
  customElements.define('video-processor', VideoProcessor);
}