import { KyronApp } from "./_components/KyronApp";

export const metadata = {
  title: "Voice Clone | Kyron Medical",
  description: "Create your voice clone with Kyron Medical AI",
};

export default function ClonePage() {
  return (
    <div className="clone-wrapper">
      <KyronApp />
    </div>
  );
}