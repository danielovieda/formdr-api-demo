import { useEffect, useRef } from "react";

export default function PdfViewerComponent(props) {
const containerRef = useRef(null);

useEffect(() => {
	const container = containerRef.current;
	let instance, PSPDFKit;
	(async function() {
		PSPDFKit = await import("pspdfkit");
		instance = await PSPDFKit.load({
            licenseKey: 'cNsaTVBkFa_L0W3j0jpZDKVzSyiX2XY2827RZlQZZQB5AXdZx2fqqynU-s5OnLuIDM1nsoVTqIv98JlM4LaTrMpTvUCmqzHUY4Y35h5eLVpoJzLs2DsZRsD709YcXdOvbee3PkW9tvBkSleHymCsdNpHpTR9YM4Nhye6zBM7XP-PMRcZQKjapRFpBIoKIUwwmbb4EC5YV-2dDEws67Bs6uTVRyyICOhUa5iv_GfBrehe8Dk3Z2JMFZxES2wBXbcM9tMIxe77yUr0vWyfuhoQ2RBxiQ94CWLVFMAPlIxuo8csCI_n_NVo50rcDsAUybv5Sls5PYLrLWf575rNweZUtlsa877MRCdxQ6C7EO-eSQxy98fjK-LNyr13bheFeebHS_Cwm6BIR2zz0DtfK-WRXGFFzCqDpWw7brlyk-5gZxMuuy1F_pUKXSa9ONe3oNeNHOSfJLIPQVPxwAf1MmB2sDSSEyTmnw-ib1IbOgbmmzW7Gn22TNFVAryBeefj-4R4w8dvslp72Pi81OKcHYHLAPiMbzUP5e__rlpharmmdgcxuAJHODIEo8E1OoQnTtZa40iheuqKYemtV6Uq6K6NmNwnOzB94LW6B_Io6JVMyxEk7tqTv1cQcVsK6Uk2essiF6ChR6raQxrI_-_jU63Qa97BSRiIpDTvsuhG9DzeG-Xo0Rjf08sSR0VDwcOcJ3SmwGW59ziXMtmYqHJ4d4Unp5tIldLPE9lw1E7hgggwx8woWXBb6HBdrCJFLnr6aqRKGMVbD1I0ZO5Q50cSPEtyPQ==',
		// Container where PSPDFKit should be mounted.
		container,
		// The document to open.
		document: props.b64document ? `data:application/pdf;base64,${props.b64document}` : props.document,
		// Use the public directory URL as a base URL. PSPDFKit will download its library assets from here.
		baseUrl: `${window.location.protocol}//${window.location.host}/${process.env.PUBLIC_URL}`
		});
	})();

	return () => PSPDFKit && PSPDFKit.unload(container);
}, []);

return (
	<div ref={containerRef} style={{ width: "100%", height: "100vh"}}/>
);
}