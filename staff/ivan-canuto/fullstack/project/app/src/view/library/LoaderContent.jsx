import Container from "./Container"
import { context } from "../../ui"

export default function LoaderContent() {
	return <Container className='fixed top-0 left-0 bg-black bg-opacity-20 w-full h-full z-50'>
		<section className="w-3/5 h-1/3 rounded-xl bg-gray-800 border-gray-400 flex flex-col justify-center items-center gap-6">
			<p className="text-2xl text-white">{context.summary ? 'Loading summary...' : 'Loading...'}</p>
			<svg width="105" height="105" viewBox="0 0 105 105" xmlns="http://www.w3.org/2000/svg" fill="#fff">
				<circle cx="12.5" cy="12.5" r="12.5">
					<animate attributeName="fill-opacity"
						begin="0s" dur="1s"
						values="1;.2;1" calcMode="linear"
						repeatCount="indefinite" />
				</circle>
				<circle cx="12.5" cy="52.5" r="12.5" fillOpacity=".5">
					<animate attributeName="fill-opacity"
						begin="100ms" dur="1s"
						values="1;.2;1" calcMode="linear"
						repeatCount="indefinite" />
				</circle>
				<circle cx="52.5" cy="12.5" r="12.5">
					<animate attributeName="fill-opacity"
						begin="300ms" dur="1s"
						values="1;.2;1" calcMode="linear"
						repeatCount="indefinite" />
				</circle>
				<circle cx="52.5" cy="52.5" r="12.5">
					<animate attributeName="fill-opacity"
						begin="600ms" dur="1s"
						values="1;.2;1" calcMode="linear"
						repeatCount="indefinite" />
				</circle>
				<circle cx="92.5" cy="12.5" r="12.5">
					<animate attributeName="fill-opacity"
						begin="800ms" dur="1s"
						values="1;.2;1" calcMode="linear"
						repeatCount="indefinite" />
				</circle>
				<circle cx="92.5" cy="52.5" r="12.5">
					<animate attributeName="fill-opacity"
						begin="400ms" dur="1s"
						values="1;.2;1" calcMode="linear"
						repeatCount="indefinite" />
				</circle>
				<circle cx="12.5" cy="92.5" r="12.5">
					<animate attributeName="fill-opacity"
						begin="700ms" dur="1s"
						values="1;.2;1" calcMode="linear"
						repeatCount="indefinite" />
				</circle>
				<circle cx="52.5" cy="92.5" r="12.5">
					<animate attributeName="fill-opacity"
						begin="500ms" dur="1s"
						values="1;.2;1" calcMode="linear"
						repeatCount="indefinite" />
				</circle>
				<circle cx="92.5" cy="92.5" r="12.5">
					<animate attributeName="fill-opacity"
						begin="200ms" dur="1s"
						values="1;.2;1" calcMode="linear"
						repeatCount="indefinite" />
				</circle>
			</svg>
		</section>
        {/* <div className="w-full h-full fixed top-0 left-0 bg-black bg-opacity-20"></div> */}
	</Container>
}

