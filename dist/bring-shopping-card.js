function t(t,e,i,s){var r,a=arguments.length,o=a<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,i,s);else for(var n=t.length-1;n>=0;n--)(r=t[n])&&(o=(a<3?r(o):a>3?r(e,i,o):r(e,i))||o);return a>3&&o&&Object.defineProperty(e,i,o),o}"function"==typeof SuppressedError&&SuppressedError;const e=globalThis,i=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),r=new WeakMap;let a=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(i&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=r.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&r.set(e,t))}return t}toString(){return this.cssText}};const o=(t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1],t[0]);return new a(i,t,s)},n=i?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new a("string"==typeof t?t:t+"",void 0,s))(e)})(t):t,{is:d,defineProperty:c,getOwnPropertyDescriptor:l,getOwnPropertyNames:h,getOwnPropertySymbols:p,getPrototypeOf:g}=Object,u=globalThis,m=u.trustedTypes,v=m?m.emptyScript:"",b=u.reactiveElementPolyfillSupport,_=(t,e)=>t,f={toAttribute(t,e){switch(e){case Boolean:t=t?v:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},x=(t,e)=>!d(t,e),y={attribute:!0,type:String,converter:f,reflect:!1,useDefault:!1,hasChanged:x};Symbol.metadata??=Symbol("metadata"),u.litPropertyMetadata??=new WeakMap;let w=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=y){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(t,i,e);void 0!==s&&c(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){const{get:s,set:r}=l(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:s,set(e){const a=s?.call(this);r?.call(this,e),this.requestUpdate(t,a,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??y}static _$Ei(){if(this.hasOwnProperty(_("elementProperties")))return;const t=g(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(_("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(_("properties"))){const t=this.properties,e=[...h(t),...p(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(n(t))}else void 0!==t&&e.push(n(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,s)=>{if(i)t.adoptedStyleSheets=s.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const i of s){const s=document.createElement("style"),r=e.litNonce;void 0!==r&&s.setAttribute("nonce",r),s.textContent=i.cssText,t.appendChild(s)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(void 0!==s&&!0===i.reflect){const r=(void 0!==i.converter?.toAttribute?i.converter:f).toAttribute(e,i.type);this._$Em=t,null==r?this.removeAttribute(s):this.setAttribute(s,r),this._$Em=null}}_$AK(t,e){const i=this.constructor,s=i._$Eh.get(t);if(void 0!==s&&this._$Em!==s){const t=i.getPropertyOptions(s),r="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:f;this._$Em=s;const a=r.fromAttribute(e,t.type);this[s]=a??this._$Ej?.get(s)??a,this._$Em=null}}requestUpdate(t,e,i,s=!1,r){if(void 0!==t){const a=this.constructor;if(!1===s&&(r=this[t]),i??=a.getPropertyOptions(t),!((i.hasChanged??x)(r,e)||i.useDefault&&i.reflect&&r===this._$Ej?.get(t)&&!this.hasAttribute(a._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:r},a){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,a??e??this[t]),!0!==r||void 0!==a)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===s&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,s=this[e];!0!==t||this._$AL.has(e)||void 0===s||this.C(e,void 0,i,s)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};w.elementStyles=[],w.shadowRootOptions={mode:"open"},w[_("elementProperties")]=new Map,w[_("finalized")]=new Map,b?.({ReactiveElement:w}),(u.reactiveElementVersions??=[]).push("2.1.2");const $=globalThis,k=t=>t,S=$.trustedTypes,A=S?S.createPolicy("lit-html",{createHTML:t=>t}):void 0,E="$lit$",C=`lit$${Math.random().toFixed(9).slice(2)}$`,I="?"+C,z=`<${I}>`,L=document,U=()=>L.createComment(""),O=t=>null===t||"object"!=typeof t&&"function"!=typeof t,P=Array.isArray,T="[ \t\n\f\r]",M=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,N=/-->/g,D=/>/g,H=RegExp(`>|${T}(?:([^\\s"'>=/]+)(${T}*=${T}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),R=/'/g,q=/"/g,B=/^(?:script|style|textarea|title)$/i,j=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),F=Symbol.for("lit-noChange"),Q=Symbol.for("lit-nothing"),W=new WeakMap,K=L.createTreeWalker(L,129);function Z(t,e){if(!P(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==A?A.createHTML(e):e}const Y=(t,e)=>{const i=t.length-1,s=[];let r,a=2===e?"<svg>":3===e?"<math>":"",o=M;for(let e=0;e<i;e++){const i=t[e];let n,d,c=-1,l=0;for(;l<i.length&&(o.lastIndex=l,d=o.exec(i),null!==d);)l=o.lastIndex,o===M?"!--"===d[1]?o=N:void 0!==d[1]?o=D:void 0!==d[2]?(B.test(d[2])&&(r=RegExp("</"+d[2],"g")),o=H):void 0!==d[3]&&(o=H):o===H?">"===d[0]?(o=r??M,c=-1):void 0===d[1]?c=-2:(c=o.lastIndex-d[2].length,n=d[1],o=void 0===d[3]?H:'"'===d[3]?q:R):o===q||o===R?o=H:o===N||o===D?o=M:(o=H,r=void 0);const h=o===H&&t[e+1].startsWith("/>")?" ":"";a+=o===M?i+z:c>=0?(s.push(n),i.slice(0,c)+E+i.slice(c)+C+h):i+C+(-2===c?e:h)}return[Z(t,a+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),s]};class V{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let r=0,a=0;const o=t.length-1,n=this.parts,[d,c]=Y(t,e);if(this.el=V.createElement(d,i),K.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(s=K.nextNode())&&n.length<o;){if(1===s.nodeType){if(s.hasAttributes())for(const t of s.getAttributeNames())if(t.endsWith(E)){const e=c[a++],i=s.getAttribute(t).split(C),o=/([.?@])?(.*)/.exec(e);n.push({type:1,index:r,name:o[2],strings:i,ctor:"."===o[1]?et:"?"===o[1]?it:"@"===o[1]?st:tt}),s.removeAttribute(t)}else t.startsWith(C)&&(n.push({type:6,index:r}),s.removeAttribute(t));if(B.test(s.tagName)){const t=s.textContent.split(C),e=t.length-1;if(e>0){s.textContent=S?S.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],U()),K.nextNode(),n.push({type:2,index:++r});s.append(t[e],U())}}}else if(8===s.nodeType)if(s.data===I)n.push({type:2,index:r});else{let t=-1;for(;-1!==(t=s.data.indexOf(C,t+1));)n.push({type:7,index:r}),t+=C.length-1}r++}}static createElement(t,e){const i=L.createElement("template");return i.innerHTML=t,i}}function J(t,e,i=t,s){if(e===F)return e;let r=void 0!==s?i._$Co?.[s]:i._$Cl;const a=O(e)?void 0:e._$litDirective$;return r?.constructor!==a&&(r?._$AO?.(!1),void 0===a?r=void 0:(r=new a(t),r._$AT(t,i,s)),void 0!==s?(i._$Co??=[])[s]=r:i._$Cl=r),void 0!==r&&(e=J(t,r._$AS(t,e.values),r,s)),e}class X{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??L).importNode(e,!0);K.currentNode=s;let r=K.nextNode(),a=0,o=0,n=i[0];for(;void 0!==n;){if(a===n.index){let e;2===n.type?e=new G(r,r.nextSibling,this,t):1===n.type?e=new n.ctor(r,n.name,n.strings,this,t):6===n.type&&(e=new rt(r,this,t)),this._$AV.push(e),n=i[++o]}a!==n?.index&&(r=K.nextNode(),a++)}return K.currentNode=L,s}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class G{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=Q,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=J(this,t,e),O(t)?t===Q||null==t||""===t?(this._$AH!==Q&&this._$AR(),this._$AH=Q):t!==this._$AH&&t!==F&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>P(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==Q&&O(this._$AH)?this._$AA.nextSibling.data=t:this.T(L.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,s="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=V.createElement(Z(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{const t=new X(s,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=W.get(t.strings);return void 0===e&&W.set(t.strings,e=new V(t)),e}k(t){P(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const r of t)s===e.length?e.push(i=new G(this.O(U()),this.O(U()),this,this.options)):i=e[s],i._$AI(r),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=k(t).nextSibling;k(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class tt{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,r){this.type=1,this._$AH=Q,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=r,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=Q}_$AI(t,e=this,i,s){const r=this.strings;let a=!1;if(void 0===r)t=J(this,t,e,0),a=!O(t)||t!==this._$AH&&t!==F,a&&(this._$AH=t);else{const s=t;let o,n;for(t=r[0],o=0;o<r.length-1;o++)n=J(this,s[i+o],e,o),n===F&&(n=this._$AH[o]),a||=!O(n)||n!==this._$AH[o],n===Q?t=Q:t!==Q&&(t+=(n??"")+r[o+1]),this._$AH[o]=n}a&&!s&&this.j(t)}j(t){t===Q?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class et extends tt{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===Q?void 0:t}}class it extends tt{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==Q)}}class st extends tt{constructor(t,e,i,s,r){super(t,e,i,s,r),this.type=5}_$AI(t,e=this){if((t=J(this,t,e,0)??Q)===F)return;const i=this._$AH,s=t===Q&&i!==Q||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,r=t!==Q&&(i===Q||s);s&&this.element.removeEventListener(this.name,this,i),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class rt{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){J(this,t)}}const at=$.litHtmlPolyfillSupport;at?.(V,G),($.litHtmlVersions??=[]).push("3.3.2");const ot=globalThis;class nt extends w{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const s=i?.renderBefore??e;let r=s._$litPart$;if(void 0===r){const t=i?.renderBefore??null;s._$litPart$=r=new G(e.insertBefore(U(),t),t,void 0,i??{})}return r._$AI(t),r})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return F}}nt._$litElement$=!0,nt.finalized=!0,ot.litElementHydrateSupport?.({LitElement:nt});const dt=ot.litElementPolyfillSupport;dt?.({LitElement:nt}),(ot.litElementVersions??=[]).push("4.2.2");const ct=t=>(e,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)},lt={attribute:!0,type:String,converter:f,reflect:!1,hasChanged:x},ht=(t=lt,e,i)=>{const{kind:s,metadata:r}=i;let a=globalThis.litPropertyMetadata.get(r);if(void 0===a&&globalThis.litPropertyMetadata.set(r,a=new Map),"setter"===s&&((t=Object.create(t)).wrapped=!0),a.set(i.name,t),"accessor"===s){const{name:s}=i;return{set(i){const r=e.get.call(this);e.set.call(this,i),this.requestUpdate(s,r,t,!0,i)},init(e){return void 0!==e&&this.C(s,void 0,t,e),e}}}if("setter"===s){const{name:s}=i;return function(i){const r=this[s];e.call(this,i),this.requestUpdate(s,r,t,!0,i)}}throw Error("Unsupported decorator location: "+s)};function pt(t){return(e,i)=>"object"==typeof i?ht(t,e,i):((t,e,i)=>{const s=e.hasOwnProperty(i);return e.constructor.createProperty(i,t),s?Object.getOwnPropertyDescriptor(e,i):void 0})(t,e,i)}function gt(t){return pt({...t,state:!0,attribute:!1})}const ut=o`
  :host {
    /* HA theme variables with widget defaults as fallback */
    --bring-bg-primary: var(--ha-card-background, var(--card-background-color, #0f1419));
    --bring-bg-secondary: var(--secondary-background-color, #1a2027);
    --bring-bg-tertiary: var(--primary-background-color, #242d38);
    --bring-bg-hover: var(--state-icon-hover-background-color, #2d3848);
    --bring-bg-card: var(--ha-card-background, #1e252d);
    --bring-accent: var(--primary-color, #4fd1c5);
    --bring-accent-dim: rgba(79, 209, 197, 0.12);
    --bring-accent-glow: rgba(79, 209, 197, 0.35);
    --bring-text-primary: var(--primary-text-color, #e8edf4);
    --bring-text-secondary: var(--secondary-text-color, #8b99a8);
    --bring-text-muted: var(--disabled-text-color, #5a6878);
    --bring-success: var(--success-color, #48bb78);
    --bring-error: var(--error-color, #fc8181);
    --bring-warning: var(--warning-color, #f6ad55);
    --bring-border: var(--divider-color, rgba(255, 255, 255, 0.06));
    --bring-shadow: 0 4px 24px rgba(0, 0, 0, 0.4);
    --bring-radius: var(--ha-card-border-radius, 14px);
    --bring-radius-sm: 10px;

    display: block;
    font-family: var(--paper-font-body1_-_font-family, 'Roboto', sans-serif);
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  .container {
    padding: 16px;
    background: var(--bring-bg-primary);
    border-radius: var(--bring-radius);
  }

  /* Header */
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 16px;
    gap: 12px;
    container-type: inline-size;
  }

  /* On narrow cards, drop the "Shopping Card" subtitle so the brand and the
     action buttons all stay visible instead of truncating. */
  @container (max-width: 360px) {
    .logo-text .subtitle {
      display: none;
    }
  }

  .logo {
    display: flex;
    align-items: center;
    gap: 10px;
    min-width: 0;
  }

  .logo-icon {
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .logo-icon svg {
    width: 100%;
    height: 100%;
    fill: var(--bring-accent);
    filter: drop-shadow(0 2px 8px var(--bring-accent-glow));
  }

  .logo-text {
    font-weight: 700;
    font-size: 18px;
    letter-spacing: -0.3px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: var(--bring-text-primary);
  }

  .logo-text .accent {
    color: var(--bring-accent);
  }

  .logo-text .subtitle {
    color: #f6ad55;
    font-weight: 600;
  }

  .header-actions {
    display: flex;
    gap: 8px;
    align-items: center;
    flex-shrink: 0;
  }

  .header-btn {
    width: 40px;
    height: 40px;
    border: none;
    background: var(--bring-bg-secondary);
    border-radius: var(--bring-radius-sm);
    color: var(--bring-text-secondary);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
    border: 1px solid var(--bring-border);
    flex-shrink: 0;
  }

  .header-btn:hover {
    background: var(--bring-bg-tertiary);
    color: var(--bring-accent);
  }

  .header-btn.spinning svg {
    animation: spin 0.8s linear infinite;
  }

  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  /* List Selector */
  .list-selector-wrapper {
    position: relative;
  }

  .list-btn {
    display: flex;
    align-items: center;
    gap: 6px;
    width: auto;
    padding: 8px 12px;
  }

  .list-btn-text {
    max-width: 80px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 12px;
  }

  .list-btn svg {
    flex-shrink: 0;
    transition: transform 0.2s ease;
  }

  .list-btn.open svg {
    transform: rotate(180deg);
  }

  .list-dropdown {
    position: absolute;
    top: 100%;
    right: 0;
    margin-top: 8px;
    background: var(--bring-bg-secondary);
    border: 1px solid var(--bring-border);
    border-radius: var(--bring-radius-sm);
    padding: 6px;
    min-width: 150px;
    z-index: 100;
    box-shadow: var(--bring-shadow);
  }

  .list-option {
    padding: 10px 14px;
    font-size: 13px;
    color: var(--bring-text-secondary);
    cursor: pointer;
    border-radius: 6px;
    transition: all 0.15s ease;
  }

  .list-option:hover {
    background: var(--bring-bg-hover);
    color: var(--bring-text-primary);
  }

  .list-option.active {
    color: var(--bring-accent);
    background: var(--bring-accent-dim);
  }

  /* Sort Dropdown */
  .sort-dropdown {
    position: relative;
  }

  .sort-menu {
    position: absolute;
    top: 100%;
    right: 0;
    margin-top: 8px;
    background: var(--bring-bg-secondary);
    border: 1px solid var(--bring-border);
    border-radius: var(--bring-radius-sm);
    padding: 6px;
    min-width: 160px;
    z-index: 100;
    display: none;
    box-shadow: var(--bring-shadow);
  }

  .sort-menu.open {
    display: block;
  }

  .sort-option {
    padding: 10px 14px;
    font-size: 13px;
    color: var(--bring-text-secondary);
    cursor: pointer;
    border-radius: 6px;
    display: flex;
    align-items: center;
    gap: 10px;
    transition: all 0.15s ease;
  }

  .sort-option:hover {
    background: var(--bring-bg-hover);
    color: var(--bring-text-primary);
  }

  .sort-option.active {
    color: var(--bring-accent);
    background: var(--bring-accent-dim);
  }

  /* Add Item Section */
  .add-section {
    background: var(--bring-bg-secondary);
    border-radius: var(--bring-radius);
    padding: 4px;
    margin-bottom: 20px;
    display: flex;
    gap: 4px;
    border: 1px solid var(--bring-border);
    position: relative;
  }

  .add-input-wrapper {
    flex: 1;
    min-width: 0;
    position: relative;
  }

  .add-input {
    width: 100%;
    background: transparent;
    border: none;
    padding: 12px 16px;
    font-size: 14px;
    color: var(--bring-text-primary);
    font-family: inherit;
    outline: none;
  }

  .add-input::placeholder {
    color: var(--bring-text-muted);
  }

  /* Search Suggestions */
  .search-suggestions {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: var(--bring-bg-secondary);
    border: 1px solid var(--bring-border);
    border-radius: var(--bring-radius-sm);
    margin-top: 4px;
    max-height: 240px;
    overflow-y: auto;
    z-index: 200;
    display: none;
    box-shadow: var(--bring-shadow);
  }

  .search-suggestions.open {
    display: block;
  }

  .suggestion-item {
    padding: 10px 14px;
    display: flex;
    align-items: center;
    gap: 12px;
    cursor: pointer;
    transition: background 0.15s ease;
  }

  .suggestion-item:hover,
  .suggestion-item.selected {
    background: var(--bring-bg-hover);
  }

  .suggestion-img {
    width: 28px;
    height: 28px;
    object-fit: contain;
    border-radius: 4px;
  }

  .suggestion-icon {
    font-size: 20px;
    width: 28px;
    text-align: center;
  }

  .suggestion-text {
    flex: 1;
    font-size: 14px;
    color: var(--bring-text-primary);
  }

  .suggestion-category {
    font-size: 11px;
    color: var(--bring-text-muted);
  }

  .add-btn {
    background: var(--bring-accent);
    color: var(--bring-bg-primary);
    border: none;
    padding: 12px 24px;
    border-radius: var(--bring-radius-sm);
    font-weight: 600;
    font-size: 14px;
    cursor: pointer;
    transition: all 0.2s ease;
    font-family: inherit;
    flex-shrink: 0;
  }

  .add-btn:hover {
    filter: brightness(1.1);
    box-shadow: 0 4px 16px var(--bring-accent-glow);
  }

  .add-btn:active {
    transform: scale(0.97);
  }

  /* Section */
  .section {
    margin-bottom: 24px;
  }

  .section-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 12px;
    padding: 0 2px;
    gap: 8px;
  }

  .section-title {
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.8px;
    color: var(--bring-text-secondary);
  }

  .section-count {
    font-size: 10px;
    font-weight: 600;
    color: var(--bring-accent);
    background: var(--bring-accent-dim);
    padding: 2px 8px;
    border-radius: 10px;
    flex-shrink: 0;
  }

  /* Cards Grid - sizes controlled by CSS vars */
  .cards-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(var(--bring-card-width, 70px), 1fr));
    gap: 6px;
  }

  .card {
    background: var(--bring-bg-card);
    border-radius: var(--bring-radius-sm);
    padding: var(--bring-card-padding, 8px 6px);
    border: 1px solid var(--bring-border);
    cursor: pointer;
    transition: all 0.2s ease;
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    min-height: var(--bring-card-height, 70px);
  }

  /* Size variants */
  :host([data-size="small"]) .cards-grid { grid-template-columns: repeat(auto-fill, minmax(60px, 1fr)); gap: 4px; }
  :host([data-size="small"]) .card { padding: 6px 4px; min-height: 60px; }
  :host([data-size="small"]) .card-img { width: 24px; height: 24px; margin-bottom: 4px; }
  :host([data-size="small"]) .card-icon { font-size: 18px; margin-bottom: 4px; }
  :host([data-size="small"]) .card-name { font-size: 9px; }
  :host([data-size="small"]) .card-check { width: 16px; height: 16px; top: 2px; right: 2px; }
  :host([data-size="small"]) .card-check svg { width: 10px; height: 10px; }
  :host([data-size="small"]) .card-drag { display: none; }
  :host([data-size="small"]) .card-spec { display: none; }

  :host([data-size="medium"]) .cards-grid { grid-template-columns: repeat(auto-fill, minmax(70px, 1fr)); gap: 6px; }
  :host([data-size="medium"]) .card { padding: 8px 6px; min-height: 70px; }
  :host([data-size="medium"]) .card-img { width: 28px; height: 28px; margin-bottom: 5px; }
  :host([data-size="medium"]) .card-icon { font-size: 22px; margin-bottom: 5px; }
  :host([data-size="medium"]) .card-name { font-size: 10px; }

  :host([data-size="large"]) .cards-grid { grid-template-columns: repeat(auto-fill, minmax(90px, 1fr)); gap: 8px; }
  :host([data-size="large"]) .card { padding: 12px 10px; min-height: 95px; }
  :host([data-size="large"]) .card-img { width: 40px; height: 40px; margin-bottom: 8px; }
  :host([data-size="large"]) .card-icon { font-size: 32px; margin-bottom: 8px; }
  :host([data-size="large"]) .card-name { font-size: 12px; }

  .card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: transparent;
    transition: background 0.2s ease;
  }

  .card:hover {
    background: var(--bring-bg-hover);
    border-color: var(--bring-accent);
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
  }

  .card:hover::before {
    background: var(--bring-accent);
  }

  .card:active {
    transform: translateY(0) scale(0.98);
  }

  .card.completing {
    animation: cardComplete 0.4s ease-out forwards;
  }

  .card.dragging {
    opacity: 0.5;
    transform: scale(0.95);
  }

  .card.drag-over {
    border-color: var(--bring-accent);
    background: var(--bring-accent-dim);
  }

  @keyframes cardComplete {
    0% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.5; transform: scale(0.95); }
    100% { opacity: 0; transform: scale(0.8); }
  }

  .card-img {
    width: 28px;
    height: 28px;
    object-fit: contain;
    margin-bottom: 5px;
    filter: drop-shadow(0 2px 4px rgba(0,0,0,0.2));
  }

  .card-icon {
    font-size: 22px;
    margin-bottom: 5px;
    filter: drop-shadow(0 2px 4px rgba(0,0,0,0.2));
  }

  .card-name {
    font-weight: 600;
    font-size: 10px;
    color: var(--bring-text-primary);
    line-height: 1.2;
    max-height: 2.4em;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    word-break: break-word;
  }

  .card-spec {
    font-size: 10px;
    color: var(--bring-accent);
    margin-top: 3px;
    cursor: pointer;
    padding: 2px 6px;
    border-radius: 4px;
    transition: background 0.15s ease;
  }

  .card-spec:hover {
    background: var(--bring-accent-dim);
  }

  .card-spec.empty {
    color: var(--bring-text-muted);
    opacity: 0;
  }

  .card:hover .card-spec.empty {
    opacity: 1;
  }

  .card-category {
    position: absolute;
    bottom: 6px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 8px;
    color: var(--bring-text-muted);
    background: var(--bring-bg-tertiary);
    padding: 2px 6px;
    border-radius: 4px;
    white-space: nowrap;
    opacity: 0;
    transition: opacity 0.2s ease;
    max-width: 90%;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .card:hover .card-category {
    opacity: 1;
  }

  .card-check {
    position: absolute;
    top: 4px;
    right: 4px;
    width: 20px;
    height: 20px;
    border: 2px solid var(--bring-text-muted);
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
    background: var(--bring-bg-secondary);
  }

  .card:hover .card-check {
    border-color: var(--bring-accent);
    background: var(--bring-accent-dim);
  }

  .card-check.checked {
    background: var(--bring-accent);
    border-color: var(--bring-accent);
  }

  .card-check svg {
    width: 12px;
    height: 12px;
    color: var(--bring-bg-primary);
    opacity: 0;
    transform: scale(0);
    transition: all 0.2s ease;
  }

  .card-check.checked svg {
    opacity: 1;
    transform: scale(1);
  }

  /* Drag Handle */
  .card-drag {
    position: absolute;
    top: 4px;
    left: 4px;
    width: 16px;
    height: 16px;
    color: var(--bring-text-muted);
    opacity: 0;
    cursor: grab;
    transition: opacity 0.2s ease;
  }

  .card:hover .card-drag {
    opacity: 0.6;
  }

  .card-drag:hover {
    opacity: 1 !important;
    color: var(--bring-accent);
  }

  .card-drag:active {
    cursor: grabbing;
  }

  /* Quick Add Cards */
  .quick-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(75px, 1fr));
    gap: 8px;
  }

  .quick-card {
    background: var(--bring-bg-secondary);
    border-radius: var(--bring-radius-sm);
    padding: 10px 8px;
    border: 1px solid var(--bring-border);
    cursor: pointer;
    transition: all 0.2s ease;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .quick-card:hover {
    background: var(--bring-bg-hover);
    border-color: var(--bring-accent);
    transform: translateY(-2px);
  }

  .quick-card:active {
    transform: translateY(0) scale(0.97);
  }

  .quick-card.adding {
    animation: quickAdd 0.3s ease;
  }

  @keyframes quickAdd {
    0% { transform: scale(1); }
    50% { transform: scale(0.92); background: var(--bring-accent-dim); }
    100% { transform: scale(1); }
  }

  .quick-card-img {
    width: 28px;
    height: 28px;
    object-fit: contain;
    margin-bottom: 6px;
  }

  .quick-card-icon {
    font-size: 20px;
    margin-bottom: 6px;
  }

  .quick-card-name {
    font-size: 10px;
    font-weight: 500;
    color: var(--bring-text-secondary);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 100%;
  }

  /* Collapsible */
  .collapsible-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    padding: 12px 16px;
    background: var(--bring-bg-secondary);
    border-radius: var(--bring-radius);
    border: 1px solid var(--bring-border);
    margin-bottom: 10px;
    transition: all 0.2s ease;
    gap: 8px;
  }

  .collapsible-header:hover {
    background: var(--bring-bg-tertiary);
  }

  .collapsible-left {
    display: flex;
    align-items: center;
    gap: 10px;
    min-width: 0;
  }

  .collapsible-icon {
    transition: transform 0.3s ease;
    color: var(--bring-text-muted);
    flex-shrink: 0;
  }

  .collapsible-header.open .collapsible-icon {
    transform: rotate(180deg);
  }

  .collapsible-content {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.3s ease;
  }

  .collapsible-content.open {
    max-height: 2000px;
  }

  /* Empty State */
  .empty-state {
    text-align: center;
    padding: 40px 20px;
    color: var(--bring-text-muted);
  }

  .empty-icon {
    font-size: 48px;
    margin-bottom: 12px;
    opacity: 0.6;
  }

  .empty-text {
    font-size: 14px;
    font-weight: 500;
  }

  .empty-sub {
    font-size: 12px;
    margin-top: 6px;
    opacity: 0.7;
  }

  /* Loading */
  .loading {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 60px;
  }

  .loading-spinner {
    width: 32px;
    height: 32px;
    border: 3px solid var(--bring-bg-tertiary);
    border-top-color: var(--bring-accent);
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }

  /* Error State */
  .error-state {
    text-align: center;
    padding: 40px 20px;
    color: var(--bring-error);
  }

  .error-icon {
    font-size: 48px;
    margin-bottom: 12px;
  }

  .error-text {
    font-size: 14px;
  }

  /* Toast */
  .toast-container {
    position: fixed;
    bottom: 24px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1000;
    display: flex;
    flex-direction: column;
    gap: 8px;
    pointer-events: none;
  }

  .toast {
    background: var(--bring-bg-tertiary);
    color: var(--bring-text-primary);
    padding: 12px 20px;
    border-radius: var(--bring-radius-sm);
    font-size: 13px;
    font-weight: 500;
    box-shadow: var(--bring-shadow);
    animation: toastIn 0.3s ease;
    border-left: 3px solid var(--bring-accent);
    text-align: center;
    pointer-events: auto;
  }

  .toast.error {
    border-left-color: var(--bring-error);
  }

  .toast.success {
    border-left-color: var(--bring-success);
  }

  @keyframes toastIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes toastOut {
    from { opacity: 1; transform: translateY(0); }
    to { opacity: 0; transform: translateY(20px); }
  }

  /* Divider */
  .divider {
    height: 1px;
    background: var(--bring-border);
    margin: 20px 0;
  }

  /* Modal */
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.7);
    display: none;
    align-items: center;
    justify-content: center;
    z-index: 500;
    padding: 20px;
  }

  .modal-overlay.open {
    display: flex;
  }

  .modal {
    background: var(--bring-bg-secondary);
    border-radius: var(--bring-radius);
    padding: 24px;
    max-width: 320px;
    width: 100%;
    border: 1px solid var(--bring-border);
    box-shadow: var(--bring-shadow);
  }

  .modal-title {
    font-size: 16px;
    font-weight: 700;
    margin-bottom: 16px;
    color: var(--bring-text-primary);
  }

  .modal-input {
    width: 100%;
    background: var(--bring-bg-tertiary);
    border: 1px solid var(--bring-border);
    border-radius: var(--bring-radius-sm);
    padding: 12px 14px;
    font-size: 14px;
    color: var(--bring-text-primary);
    font-family: inherit;
    outline: none;
    margin-bottom: 16px;
  }

  .modal-input:focus {
    border-color: var(--bring-accent);
  }

  .modal-actions {
    display: flex;
    gap: 10px;
    justify-content: flex-end;
  }

  .modal-btn {
    padding: 10px 18px;
    border-radius: var(--bring-radius-sm);
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    font-family: inherit;
    border: none;
  }

  .modal-btn.cancel {
    background: var(--bring-bg-tertiary);
    color: var(--bring-text-secondary);
  }

  .modal-btn.cancel:hover {
    background: var(--bring-bg-hover);
    color: var(--bring-text-primary);
  }

  .modal-btn.save {
    background: var(--bring-accent);
    color: var(--bring-bg-primary);
  }

  .modal-btn.save:hover {
    filter: brightness(1.1);
  }

  /* Scrollbar */
  ::-webkit-scrollbar {
    width: 5px;
  }
  ::-webkit-scrollbar-track {
    background: transparent;
  }
  ::-webkit-scrollbar-thumb {
    background: var(--bring-bg-tertiary);
    border-radius: 3px;
  }
`,mt=(t,e)=>`bring-shopping-card-${t}${e?`-${e}`:""}`;let vt=class extends nt{setConfig(t){this._config=t}_valueChanged(t,e){if(!this._config)return;const i={...this._config,[t]:e},s=new CustomEvent("config-changed",{detail:{config:i},bubbles:!0,composed:!0});this.dispatchEvent(s)}render(){return this._config?j`
      <div class="editor">
        <div class="row">
          <div>
            <div class="label">Show Quick Add</div>
            <div class="description">Display recently purchased items for quick re-adding</div>
          </div>
          <ha-switch
            .checked=${this._config.show_recently??!1}
            @change=${t=>this._valueChanged("show_recently",t.target.checked)}
          ></ha-switch>
        </div>

        <div class="row">
          <div>
            <div class="label">Show All Items</div>
            <div class="description">Display all available items grouped by category</div>
          </div>
          <ha-switch
            .checked=${this._config.show_available??!1}
            @change=${t=>this._valueChanged("show_available",t.target.checked)}
          ></ha-switch>
        </div>

        <div class="row">
          <div>
            <div class="label">Max Quick Add Items</div>
            <div class="description">Maximum items to show in Quick Add section</div>
          </div>
          <input
            type="number"
            min="4"
            max="24"
            .value=${String(this._config.max_quick_items??12)}
            @change=${t=>this._valueChanged("max_quick_items",parseInt(t.target.value)||12)}
          />
        </div>

        <div class="row">
          <div>
            <div class="label">Card Size</div>
            <div class="description">Size of the product item cards</div>
          </div>
          <select
            @change=${t=>this._valueChanged("card_size",t.target.value)}
            style="padding: 8px; border: 1px solid var(--divider-color); border-radius: 4px; background: var(--card-background-color); color: var(--primary-text-color);"
          >
            <option value="small" ?selected=${"small"===(this._config.card_size??"medium")}>Small</option>
            <option value="medium" ?selected=${"medium"===(this._config.card_size??"medium")}>Medium</option>
            <option value="large" ?selected=${"large"===(this._config.card_size??"medium")}>Large</option>
          </select>
        </div>
      </div>
    `:j``}};vt.styles=o`
    .editor {
      padding: 16px;
    }
    .row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px 0;
      border-bottom: 1px solid var(--divider-color, rgba(0,0,0,0.12));
    }
    .row:last-child {
      border-bottom: none;
    }
    .label {
      font-weight: 500;
    }
    .description {
      font-size: 12px;
      color: var(--secondary-text-color);
      margin-top: 4px;
    }
    ha-switch {
      --mdc-theme-secondary: var(--primary-color);
    }
    input[type="number"] {
      width: 60px;
      padding: 8px;
      border: 1px solid var(--divider-color);
      border-radius: 4px;
      background: var(--card-background-color);
      color: var(--primary-text-color);
    }
  `,t([pt({attribute:!1})],vt.prototype,"hass",void 0),t([gt()],vt.prototype,"_config",void 0),vt=t([ct("bring-shopping-card-editor")],vt);let bt=class extends nt{constructor(){super(...arguments),this._lists=[],this._selectedListUuid=null,this._items=[],this._recentItems=[],this._availableItems=[],this._sortBy="manual",this._customOrder=[],this._searchQuery="",this._selectedSuggestion=-1,this._loading=!0,this._error=null,this._editingItem=null,this._showSortMenu=!1,this._showListDropdown=!1,this._showSuggestions=!1,this._failedImages=new Set,this._cardKey="default",this._draggedItem=null}setConfig(t){if(!t)throw new Error("Invalid configuration");this.config={show_recently:!1,show_available:!1,max_quick_items:12,sort_default:"manual",card_size:"medium",...t},this._cardKey=this.config.card_id||"default",this._sortBy=this.config.sort_default||"manual",this.dataset.size=this.config.card_size||"medium"}static getConfigElement(){return document.createElement("bring-shopping-card-editor")}static getStubConfig(){return{type:"custom:bring-shopping-card"}}getCardSize(){return 5}connectedCallback(){super.connectedCallback(),this._loadSavedState(),this._fetchLists(),this._startAutoRefresh()}disconnectedCallback(){super.disconnectedCallback(),this._stopAutoRefresh()}_loadSavedState(){try{const t=localStorage.getItem(mt("list",this._cardKey));t&&(this._selectedListUuid=t);const e=localStorage.getItem(mt("sort",this._cardKey));e&&(this._sortBy=e);const i=localStorage.getItem(mt("order",this._cardKey));i&&(this._customOrder=JSON.parse(i))}catch(t){console.error("Failed to load saved state:",t)}}_saveState(){try{this._selectedListUuid&&localStorage.setItem(mt("list",this._cardKey),this._selectedListUuid),localStorage.setItem(mt("sort",this._cardKey),this._sortBy),localStorage.setItem(mt("order",this._cardKey),JSON.stringify(this._customOrder))}catch(t){console.error("Failed to save state:",t)}}async _fetchLists(){try{const t=await this.hass.callWS({type:"bring_shopping/get_lists"});this._lists=t.lists,this._lists.length>0?(this._selectedListUuid&&this._lists.find(t=>t.uuid===this._selectedListUuid)||(this._selectedListUuid=this._lists[0].uuid),await this._fetchItems()):(this._loading=!1,this._error="No shopping lists found")}catch(t){console.error("Failed to fetch lists:",t),this._loading=!1,this._error="Failed to connect to Bring! integration"}}async _fetchItems(){if(this._selectedListUuid)try{const t=await this.hass.callWS({type:"bring_shopping/get_items",list_uuid:this._selectedListUuid});this._items=t.purchase,this._recentItems=t.recently,this._availableItems=t.available,this._loading=!1,this._error=null}catch(t){console.error("Failed to fetch items:",t),this._loading=!1,this._error="Failed to load shopping list"}}_startAutoRefresh(){this._refreshInterval=window.setInterval(()=>{document.hidden||this._fetchItems()},6e4)}_stopAutoRefresh(){this._refreshInterval&&clearInterval(this._refreshInterval)}_getSortedItems(){const t=[...this._items];switch(this._sortBy){case"manual":const e={};return this._customOrder.forEach((t,i)=>e[t]=i),t.sort((t,i)=>(e[t.originalName]??999)-(e[i.originalName]??999));case"alpha":return t.sort((t,e)=>t.name.localeCompare(e.name));case"category":return t.sort((t,e)=>{const i=t.category||"ZZZ",s=e.category||"ZZZ";return i!==s?i.localeCompare(s):t.name.localeCompare(e.name)});default:return t}}_getFilteredSuggestions(){if(!this._searchQuery.trim())return[];const t=this._searchQuery.toLowerCase(),e=this._availableItems.filter(e=>e.name.toLowerCase().includes(t)||e.originalName.toLowerCase().includes(t)),i=this._recentItems.filter(e=>(e.name.toLowerCase().includes(t)||e.originalName.toLowerCase().includes(t))&&!this._items.some(t=>t.originalName===e.originalName)),s=[...e];return i.forEach(t=>{s.some(e=>e.originalName===t.originalName)||s.push(t)}),s.slice(0,8)}async _addItem(t,e,i=""){if(t.trim()&&this._selectedListUuid)try{await this.hass.callWS({type:"bring_shopping/add_item",list_uuid:this._selectedListUuid,item_name:t.trim(),original_name:e||t.trim(),specification:i}),this._showToast(`Added ${t}`,"success"),await this._fetchItems()}catch(t){console.error("Failed to add item:",t),this._showToast("Failed to add item","error")}}async _completeItem(t,e){if(this._selectedListUuid){e.classList.add("completing");try{await this.hass.callWS({type:"bring_shopping/complete_item",list_uuid:this._selectedListUuid,original_name:t.originalName}),setTimeout(()=>{this._showToast(`Done: ${t.name}`,"success"),this._fetchItems()},350)}catch(t){console.error("Failed to complete item:",t),e.classList.remove("completing"),this._showToast("Failed to complete item","error")}}}async _updateItemSpec(t,e){if(this._selectedListUuid)try{await this.hass.callWS({type:"bring_shopping/update_item",list_uuid:this._selectedListUuid,original_name:t.originalName,specification:e}),this._showToast("Updated","success"),await this._fetchItems()}catch(t){console.error("Failed to update item:",t),this._showToast("Failed to update","error")}}_showToast(t,e="success"){const i=this.shadowRoot?.querySelector(".toast-container");if(!i)return;const s=document.createElement("div");s.className=`toast ${e}`,s.textContent=t,i.appendChild(s),setTimeout(()=>{s.style.animation="toastOut 0.3s ease forwards",setTimeout(()=>s.remove(),300)},2e3)}_handleInputKeydown(t){const e=this._getFilteredSuggestions(),i=t.target;if("ArrowDown"===t.key)t.preventDefault(),this._selectedSuggestion=Math.min(this._selectedSuggestion+1,e.length-1);else if("ArrowUp"===t.key)t.preventDefault(),this._selectedSuggestion=Math.max(this._selectedSuggestion-1,-1);else if("Enter"===t.key)if(t.preventDefault(),this._selectedSuggestion>=0&&e[this._selectedSuggestion]){const t=e[this._selectedSuggestion];this._addItem(t.name,t.originalName),i.value="",this._searchQuery="",this._showSuggestions=!1}else i.value.trim()&&(this._addItem(i.value),i.value="",this._searchQuery="",this._showSuggestions=!1);else"Escape"===t.key&&(this._showSuggestions=!1)}_handleInputChange(t){const e=t.target;this._searchQuery=e.value,this._showSuggestions=e.value.length>0,this._selectedSuggestion=-1}_handleSuggestionClick(t){this._addItem(t.name,t.originalName);const e=this.shadowRoot?.querySelector(".add-input");e&&(e.value=""),this._searchQuery="",this._showSuggestions=!1}_handleDragStart(t,e){this._draggedItem=e,t.target.classList.add("dragging"),t.dataTransfer.effectAllowed="move"}_handleDragEnd(t){t.target.classList.remove("dragging"),this.shadowRoot?.querySelectorAll(".card.drag-over").forEach(t=>{t.classList.remove("drag-over")}),this._draggedItem=null}_handleDragOver(t){t.preventDefault(),t.dataTransfer.dropEffect="move"}_handleDragEnter(t,e){e.classList.add("drag-over")}_handleDragLeave(t,e){e.classList.remove("drag-over")}_handleDrop(t,e,i){if(t.preventDefault(),i.classList.remove("drag-over"),!this._draggedItem||this._draggedItem.originalName===e.originalName)return;-1===this._customOrder.indexOf(this._draggedItem.originalName)&&this._customOrder.push(this._draggedItem.originalName),this._customOrder=this._customOrder.filter(t=>t!==this._draggedItem.originalName);const s=this._customOrder.indexOf(e.originalName);this._customOrder.splice(s,0,this._draggedItem.originalName),"manual"!==this._sortBy&&(this._sortBy="manual"),this._saveState(),this.requestUpdate()}_selectList(t){this._selectedListUuid=t.uuid,this._showListDropdown=!1,this._saveState(),this._fetchItems()}_renderImage(t,e){const i="large"===e?"card-img":"quick-card-img",s="large"===e?"card-icon":"quick-card-icon";return t.imageUrl&&!this._failedImages.has(t.imageUrl)?j`
        <img
          class="${i}"
          src="${t.imageUrl}"
          alt="${t.name}"
          @error=${e=>{e.target.style.display="none",e.target.nextElementSibling?.removeAttribute("style"),this._failedImages.add(t.imageUrl)}}
        />
        <span class="${s}" style="display:none">${t.icon||"🛒"}</span>
      `:j`<span class="${s}">${t.icon||"🛒"}</span>`}_renderHeader(){const t=this._lists.find(t=>t.uuid===this._selectedListUuid);return j`
      <header class="header">
        <div class="logo">
          <div class="logo-icon">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/>
            </svg>
          </div>
          <div class="logo-text">Bring<span class="accent">!</span> <span class="subtitle">Shopping Card</span></div>
        </div>
        <div class="header-actions">
          ${this._lists.length>1?j`
                <div class="list-selector-wrapper">
                  <button
                    class="header-btn list-btn ${this._showListDropdown?"open":""}"
                    @click=${t=>{t.stopPropagation(),t.preventDefault(),this._showListDropdown=!this._showListDropdown,this._showSortMenu=!1}}
                    title="Select List"
                  >
                    <span class="list-btn-text">${t?.name||"List"}</span>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </button>
                  ${this._showListDropdown?j`
                        <div class="list-dropdown open">
                          ${this._lists.map(t=>j`
                              <div
                                class="list-option ${t.uuid===this._selectedListUuid?"active":""}"
                                @mousedown=${e=>{e.stopPropagation(),e.preventDefault(),this._selectList(t)}}
                              >
                                ${t.name}
                              </div>
                            `)}
                        </div>
                      `:Q}
                </div>
              `:Q}
          <div class="sort-dropdown">
            <button
              class="header-btn"
              @click=${t=>{t.stopPropagation(),t.preventDefault(),this._showSortMenu=!this._showSortMenu,this._showListDropdown=!1}}
              title="Sort"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="4" y1="6" x2="20" y2="6"></line>
                <line x1="4" y1="12" x2="14" y2="12"></line>
                <line x1="4" y1="18" x2="9" y2="18"></line>
              </svg>
            </button>
            ${this._showSortMenu?j`
                  <div class="sort-menu open">
                    ${["manual","alpha","category","recent"].map(t=>j`
                        <div
                          class="sort-option ${this._sortBy===t?"active":""}"
                          @mousedown=${e=>{e.stopPropagation(),e.preventDefault(),this._sortBy=t,this._showSortMenu=!1,this._saveState()}}
                        >
                          ${{manual:"Manual Order",alpha:"A-Z",category:"By Category",recent:"Recently Added"}[t]}
                        </div>
                      `)}
                  </div>
                `:Q}
          </div>
          <button
            class="header-btn"
            @click=${async t=>{t.stopPropagation();const e=t.currentTarget;e.classList.add("spinning"),await this._fetchItems(),e.classList.remove("spinning")}}
            title="Refresh"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 12a9 9 0 11-9-9c2.52 0 4.93 1 6.74 2.74L21 8"/>
              <path d="M21 3v5h-5"/>
            </svg>
          </button>
        </div>
      </header>
    `}_renderAddSection(){const t=this._getFilteredSuggestions();return j`
      <div class="add-section">
        <div class="add-input-wrapper">
          <input
            type="text"
            class="add-input"
            placeholder="Add item..."
            autocomplete="off"
            @input=${this._handleInputChange}
            @keydown=${this._handleInputKeydown}
            @blur=${()=>setTimeout(()=>this._showSuggestions=!1,150)}
          />
          <div class="search-suggestions ${this._showSuggestions&&t.length?"open":""}">
            ${t.map((t,e)=>j`
                <div
                  class="suggestion-item ${e===this._selectedSuggestion?"selected":""}"
                  @click=${()=>this._handleSuggestionClick(t)}
                >
                  ${t.imageUrl&&!this._failedImages.has(t.imageUrl)?j`
                        <img
                          class="suggestion-img"
                          src="${t.imageUrl}"
                          alt=""
                          @error=${e=>{e.target.style.display="none",e.target.nextElementSibling?.removeAttribute("style"),this._failedImages.add(t.imageUrl)}}
                        />
                        <span class="suggestion-icon" style="display:none">${t.icon}</span>
                      `:j`<span class="suggestion-icon">${t.icon}</span>`}
                  <span class="suggestion-text">${t.name}</span>
                  ${t.category?j`<span class="suggestion-category">${t.category}</span>`:Q}
                </div>
              `)}
          </div>
        </div>
        <button
          class="add-btn"
          @click=${()=>{const t=this.shadowRoot?.querySelector(".add-input");t?.value.trim()&&(this._addItem(t.value),t.value="",this._searchQuery="")}}
        >
          Add
        </button>
      </div>
    `}_renderPurchaseItems(){const t=this._getSortedItems();return j`
      <section class="section">
        <div class="section-header">
          <span class="section-title">To Buy</span>
          <span class="section-count">${this._items.length}</span>
        </div>
        ${0===this._items.length?j`
              <div class="empty-state">
                <div class="empty-icon">✨</div>
                <div class="empty-text">List is empty!</div>
                <div class="empty-sub">Add items above or tap below</div>
              </div>
            `:j`
              <div class="cards-grid">
                ${t.map(t=>j`
                    <div
                      class="card"
                      draggable="true"
                      @dragstart=${e=>this._handleDragStart(e,t)}
                      @dragend=${this._handleDragEnd}
                      @dragover=${this._handleDragOver}
                      @dragenter=${t=>this._handleDragEnter(t,t.currentTarget)}
                      @dragleave=${t=>this._handleDragLeave(t,t.currentTarget)}
                      @drop=${e=>this._handleDrop(e,t,e.currentTarget)}
                    >
                      <div class="card-drag">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                          <circle cx="9" cy="5" r="1.5"></circle>
                          <circle cx="9" cy="12" r="1.5"></circle>
                          <circle cx="9" cy="19" r="1.5"></circle>
                          <circle cx="15" cy="5" r="1.5"></circle>
                          <circle cx="15" cy="12" r="1.5"></circle>
                          <circle cx="15" cy="19" r="1.5"></circle>
                        </svg>
                      </div>
                      <div
                        class="card-check"
                        @click=${e=>{e.stopPropagation();const i=e.currentTarget;i.classList.add("checked"),this._completeItem(t,i.closest(".card"))}}
                      >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </div>
                      ${this._renderImage(t,"large")}
                      <span class="card-name">${t.name}</span>
                      <span
                        class="card-spec ${t.specification?"":"empty"}"
                        @click=${e=>{e.stopPropagation(),this._editingItem=t}}
                      >
                        ${t.specification||"+ note"}
                      </span>
                      ${t.category?j`<span class="card-category">${t.category}</span>`:Q}
                    </div>
                  `)}
              </div>
            `}
      </section>
    `}_renderQuickAdd(){if(!this.config.show_recently||0===this._recentItems.length)return Q;const t=this._recentItems.slice(0,this.config.max_quick_items||12);return j`
      <section class="section">
        <div class="section-header">
          <span class="section-title">Quick Add</span>
        </div>
        <div class="quick-grid">
          ${t.map(t=>j`
              <div
                class="quick-card"
                @click=${e=>{const i=e.currentTarget;i.classList.add("adding"),setTimeout(()=>i.classList.remove("adding"),300),this._addItem(t.name,t.originalName,t.specification)}}
              >
                ${this._renderImage(t,"small")}
                <span class="quick-card-name">${t.name}</span>
              </div>
            `)}
        </div>
      </section>
    `}_renderAvailableItems(){if(!this.config.show_available||0===this._availableItems.length)return Q;const t={};this._availableItems.forEach(e=>{const i=e.category||"Other";t[i]||(t[i]=[]),t[i].push(e)});const e=Object.keys(t).sort();return j`
      <div class="divider"></div>
      <section class="section">
        <div class="section-header">
          <span class="section-title">All Items</span>
          <span class="section-count">${this._availableItems.length}</span>
        </div>
        ${e.map(e=>j`
            <div
              class="collapsible-header"
              @click=${t=>{const e=t.currentTarget;e.classList.toggle("open"),e.nextElementSibling?.classList.toggle("open")}}
            >
              <div class="collapsible-left">
                <span class="section-title" style="margin:0">${e}</span>
                <span class="section-count">${t[e].length}</span>
              </div>
              <svg class="collapsible-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </div>
            <div class="collapsible-content">
              <div class="quick-grid" style="margin-bottom: 12px;">
                ${t[e].map(t=>j`
                    <div
                      class="quick-card"
                      @click=${e=>{const i=e.currentTarget;i.classList.add("adding"),setTimeout(()=>i.classList.remove("adding"),300),this._addItem(t.name,t.originalName)}}
                    >
                      ${this._renderImage(t,"small")}
                      <span class="quick-card-name">${t.name}</span>
                    </div>
                  `)}
              </div>
            </div>
          `)}
      </section>
    `}_renderEditModal(){return this._editingItem?j`
      <div
        class="modal-overlay open"
        @click=${t=>{t.target===t.currentTarget&&(this._editingItem=null)}}
      >
        <div class="modal">
          <div class="modal-title">Edit: ${this._editingItem.name}</div>
          <input
            type="text"
            class="modal-input"
            placeholder="e.g., 2 lbs, organic"
            .value=${this._editingItem.specification||""}
            @keypress=${t=>{if("Enter"===t.key){const e=t.target;this._updateItemSpec(this._editingItem,e.value.trim()),this._editingItem=null}}}
          />
          <div class="modal-actions">
            <button class="modal-btn cancel" @click=${()=>this._editingItem=null}>Cancel</button>
            <button
              class="modal-btn save"
              @click=${()=>{const t=this.shadowRoot?.querySelector(".modal-input");this._updateItemSpec(this._editingItem,t.value.trim()),this._editingItem=null}}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    `:Q}render(){const t=t=>{const e=t.target;e.closest(".list-selector-wrapper")||e.closest(".sort-dropdown")||(this._showSortMenu=!1,this._showListDropdown=!1)};return this._loading?j`
        <ha-card @click=${t}>
          <div class="container">
            ${this._renderHeader()}
            <div class="loading">
              <div class="loading-spinner"></div>
            </div>
          </div>
        </ha-card>
      `:this._error?j`
        <ha-card @click=${t}>
          <div class="container">
            ${this._renderHeader()}
            <div class="error-state">
              <div class="error-icon">⚠️</div>
              <div class="error-text">${this._error}</div>
            </div>
          </div>
        </ha-card>
      `:j`
      <ha-card @click=${t}>
        <div class="container">
          ${this._renderHeader()}
          ${this._renderAddSection()}
          ${this._renderPurchaseItems()}
          ${this._renderQuickAdd()}
          ${this._renderAvailableItems()}
        </div>
        <div class="toast-container"></div>
        ${this._renderEditModal()}
      </ha-card>
    `}};bt.styles=ut,t([pt({attribute:!1})],bt.prototype,"hass",void 0),t([pt({attribute:!1})],bt.prototype,"config",void 0),t([gt()],bt.prototype,"_lists",void 0),t([gt()],bt.prototype,"_selectedListUuid",void 0),t([gt()],bt.prototype,"_items",void 0),t([gt()],bt.prototype,"_recentItems",void 0),t([gt()],bt.prototype,"_availableItems",void 0),t([gt()],bt.prototype,"_sortBy",void 0),t([gt()],bt.prototype,"_customOrder",void 0),t([gt()],bt.prototype,"_searchQuery",void 0),t([gt()],bt.prototype,"_selectedSuggestion",void 0),t([gt()],bt.prototype,"_loading",void 0),t([gt()],bt.prototype,"_error",void 0),t([gt()],bt.prototype,"_editingItem",void 0),t([gt()],bt.prototype,"_showSortMenu",void 0),t([gt()],bt.prototype,"_showListDropdown",void 0),t([gt()],bt.prototype,"_showSuggestions",void 0),bt=t([ct("bring-shopping-card")],bt),window.customCards=window.customCards||[],window.customCards.push({type:"bring-shopping-card",name:"Bring! Shopping Card",description:"A beautiful, modern shopping list card for Bring!",preview:!0});export{bt as BringShoppingCard,vt as BringShoppingCardEditor};
