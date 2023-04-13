type YandexMetrikaProps = {
  yid: number | string;
  clickmap?: boolean | string;
  trackLinks?: boolean | string;
  accurateTrackBounce?: boolean | string;
  webvisor?: boolean | string;
};

export default function YandexMetrika({
  yid,
  clickmap = true,
  trackLinks = true,
  accurateTrackBounce = true,
  webvisor = true,
}: YandexMetrikaProps) {
  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: `
 (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)}; m[i].l=1*new Date(); for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }} k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)}) (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym"); ym(${yid}, "init", { clickmap:${clickmap}, trackLinks:${trackLinks}, accurateTrackBounce:${accurateTrackBounce}, webvisor:${webvisor} }); 
 `,
        }}
      />
      <noscript>
        <div>
          <img
            src={`https://mc.yandex.ru/watch/${yid}`}
            style={{ position: "absolute", left: "-9999px" }}
            alt=""
          />
        </div>
      </noscript>
    </>
  );
}
