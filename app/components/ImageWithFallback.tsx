import { Image, ImageProps, ImageURISource } from "react-native";
import { useState } from "react";

type ImageWIthFallBackProps = ImageProps & {
	fallback: ImageURISource;
};
const ImageWithFallback = ({ source, fallback, ...props }: ImageWIthFallBackProps) => {
	const [image, setImage] = useState(source);

	return <Image source={image} onError={() => setImage(fallback)} {...props} />;
};

export default ImageWithFallback;
