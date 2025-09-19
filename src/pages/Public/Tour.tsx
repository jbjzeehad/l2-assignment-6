import { Button } from "@/components/ui/button";
import { useState } from "react";
import Joyride, { type CallBackProps, type Step } from "react-joyride";

import HomePage from "./Home";

export default function HomePageWithTour() {
  const [run, setRun] = useState(false);

  const steps: Step[] = [
    {
      target: "#nav",
      content: "Use the navigation menu to browse pages quickly.",
    },
    {
      target: "#contact",
      content: "Contact us if you have any questions.",
    },
    {
      target: "#about",
      content: "Here you can read about our services and benefits.",
    },
    {
      target: "#get-started-btn",
      content: "Click this button to get started with your parcels.",
    },
    {
      target: "#track-parcel",
      content: "Use this section to track your parcels anytime.",
    },
  ];

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status } = data;
    if (status === "finished" || status === "skipped") {
      setRun(false);
      localStorage.setItem("hasSeenHomeTour", "true");
    }
  };

  return (
    <div>
      <HomePage />

      <Button
        className="fixed bottom-4 right-4 z-50"
        onClick={() => setRun(true)}
      >
        Restart Tour
      </Button>

      <Joyride
        steps={steps}
        run={run}
        continuous
        showProgress
        showSkipButton
        scrollToFirstStep
        styles={{
          options: {
            primaryColor: "#3b82f6",
            zIndex: 10000,
          },
        }}
        callback={handleJoyrideCallback}
      />
    </div>
  );
}
