import { Composition } from "remotion";
import { Explainer } from "./Explainer";

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="Explainer"
      component={Explainer}
      durationInFrames={450}
      fps={30}
      width={1920}
      height={1080}
    />
  );
};
