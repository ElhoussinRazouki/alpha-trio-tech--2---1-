"use client";

import * as React from "react";
import { useEffect, useState, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogPortal,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { useTranslation } from "@/lib/useTranslation";
import { useLanguage } from "@/components/language-provider";

const CALENDLY_URL =
  process.env.NEXT_PUBLIC_CALENDLY_URL ||
  "https://calendly.com/booking-alphatriotech/30min";
const WEBHOOK_URL = "/api/webhook/booking";

interface BookingData {
  opportunity: string;
  otherOpportunity?: string;
  transformation: string;
  otherTransformation?: string;
  timeline: string;
  budget: string;
  gameChanger: string;
  ts: string;
}

export function BookingFunnel() {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const isRTL = language === "AR";

  // Question 1: What's the most exciting opportunity or biggest roadblock?
  const OPPORTUNITY_OPTIONS = [
    {
      value: "Automate workflows",
      label: t("bookingFunnel.step1.options.automateWorkflows"),
    },
    {
      value: "Scale with AI",
      label: t("bookingFunnel.step1.options.scaleWithAI"),
    },
    {
      value: "Improve efficiency",
      label: t("bookingFunnel.step1.options.improveEfficiency"),
    },
    {
      value: "Digital transformation",
      label: t("bookingFunnel.step1.options.digitalTransformation"),
    },
    { value: "Other", label: t("bookingFunnel.step1.options.other") },
  ];

  // Question 2: If you could wave a magic wand and transform one aspect?
  const TRANSFORMATION_OPTIONS = [
    {
      value: "App performance",
      label: t("bookingFunnel.step2.options.appPerformance"),
    },
    {
      value: "Data insights",
      label: t("bookingFunnel.step2.options.dataInsights"),
    },
    {
      value: "Customer experience",
      label: t("bookingFunnel.step2.options.customerExperience"),
    },
    {
      value: "Operational speed",
      label: t("bookingFunnel.step2.options.operationalSpeed"),
    },
    { value: "Other", label: t("bookingFunnel.step2.options.other") },
  ];

  // Question 3: Timeline for results
  const TIMELINE_OPTIONS = [
    {
      value: "Immediately",
      label: t("bookingFunnel.step3.timelineOptions.immediately"),
    },
    {
      value: "1-3 months",
      label: t("bookingFunnel.step3.timelineOptions.oneToThreeMonths"),
    },
    {
      value: "3-6 months",
      label: t("bookingFunnel.step3.timelineOptions.threeToSixMonths"),
    },
    {
      value: "6+ months",
      label: t("bookingFunnel.step3.timelineOptions.sixPlusMonths"),
    },
  ];

  // Question 3: Investment range
  const BUDGET_OPTIONS = [
    {
      value: "$5K-15K",
      label: t("bookingFunnel.step3.budgetOptions.fiveToFifteenK"),
    },
    {
      value: "$15K-50K",
      label: t("bookingFunnel.step3.budgetOptions.fifteenToFiftyK"),
    },
    {
      value: "$50K-100K",
      label: t("bookingFunnel.step3.budgetOptions.fiftyToHundredK"),
    },
    {
      value: "$100K+",
      label: t("bookingFunnel.step3.budgetOptions.hundredKPlus"),
    },
  ];
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [opportunity, setOpportunity] = useState("");
  const [otherOpportunity, setOtherOpportunity] = useState("");
  const [transformation, setTransformation] = useState("");
  const [otherTransformation, setOtherTransformation] = useState("");
  const [timeline, setTimeline] = useState("");
  const [budget, setBudget] = useState("");
  const [gameChanger, setGameChanger] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const firstFocusableRef = useRef<HTMLButtonElement>(null);

  const pushToDataLayer = (event: string, data?: any) => {
    if (typeof window !== "undefined" && (window as any).dataLayer) {
      (window as any).dataLayer.push({ event, ...data });
    } else {
      console.log("DataLayer event:", event, data);
    }
  };

  const sendWebhook = async (payload: BookingData): Promise<boolean> => {
    try {
      const response = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      return true;
    } catch (error) {
      console.error("Webhook error:", error);
      return false;
    }
  };

  const handleContinueStep4 = async () => {
    setIsSubmitting(true);
    const payload: BookingData = {
      opportunity,
      otherOpportunity: opportunity === "Other" ? otherOpportunity : undefined,
      transformation,
      otherTransformation:
        transformation === "Other" ? otherTransformation : undefined,
      timeline,
      budget,
      gameChanger,
      ts: new Date().toISOString(),
    };

    pushToDataLayer("funnel_step4_completed", { payload });

    let success = false;
    for (let attempt = 0; attempt < 3; attempt++) {
      success = await sendWebhook(payload);
      if (success) break;
      // Retry delay
      await new Promise((resolve) => setTimeout(resolve, 1000 * (attempt + 1)));
    }

    pushToDataLayer("funnel_step5_started", { success, attempts: 3 });

    setIsSubmitting(false);
    setStep(5);
  };

  const resetForm = () => {
    setStep(1);
    setOpportunity("");
    setOtherOpportunity("");
    setTransformation("");
    setOtherTransformation("");
    setTimeline("");
    setBudget("");
    setGameChanger("");
  };

  const handleCancel = () => {
    pushToDataLayer("modal_close");
    setIsOpen(false);
    resetForm();
  };

  const handleContinueStep1 = () => {
    pushToDataLayer("funnel_step1_completed", {
      opportunity,
      otherOpportunity,
    });
    setStep(2);
  };

  const handleContinueStep2 = () => {
    pushToDataLayer("funnel_step2_completed", {
      transformation,
      otherTransformation,
    });
    setStep(3);
  };

  const handleContinueStep3 = () => {
    pushToDataLayer("funnel_step3_completed", { timeline, budget });
    setStep(4);
  };

  const canContinueStep1 =
    opportunity &&
    (opportunity !== "Other" ||
      (opportunity === "Other" &&
        otherOpportunity.trim().length > 0 &&
        otherOpportunity.trim().length <= 50));

  const canContinueStep2 =
    transformation &&
    (transformation !== "Other" ||
      (transformation === "Other" &&
        otherTransformation.trim().length > 0 &&
        otherTransformation.trim().length <= 50));

  const canContinueStep3 = timeline && budget;

  const canContinueStep4 = gameChanger.trim().length >= 10;

  // Focus management for accessibility
  useEffect(() => {
    if (!dialogRef.current) return;

    // Trap focus in dialog (shadcn Dialog handles basic trapping, but enhance for steps)
    const focusableElements = dialogRef.current.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[
      focusableElements.length - 1
    ] as HTMLElement;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        (lastElement as HTMLElement).focus();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      // Focus first element when dialog opens
      setTimeout(() => firstElement?.focus(), 100);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  // Focus first form element when step changes
  useEffect(() => {
    if (!isOpen || !dialogRef.current) return;

    let target: HTMLElement | null = null;
    if (step === 1) {
      target = dialogRef.current.querySelector(
        'input[type="radio"]'
      ) as HTMLElement;
    } else if (step === 2) {
      target = dialogRef.current.querySelector(
        'input[type="radio"]'
      ) as HTMLElement;
    } else if (step === 3) {
      target = dialogRef.current.querySelector(
        'input[type="radio"]'
      ) as HTMLElement;
    } else if (step === 4) {
      target = dialogRef.current.querySelector("textarea") as HTMLElement;
    }

    if (target) {
      setTimeout(() => target?.focus(), 100);
    }
  }, [step, isOpen]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest(
        'a[href*="book" i], a[href*="schedule" i], a[href*="consult" i], .book-cta'
      );
      if (link) {
        e.preventDefault();
        pushToDataLayer("clicked_book", {
          href: (link as HTMLAnchorElement).href,
        });
        pushToDataLayer("modal_open");
        setIsOpen(true);
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  // ESC key handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        handleCancel();
      }
    };
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Auto redirect on step 5
  useEffect(() => {
    if (step === 5) {
      pushToDataLayer("redirect_to_calendly", {});
      const timer = setTimeout(() => {
        window.open(CALENDLY_URL, "_blank");
        setIsOpen(false);
        resetForm();
      }, 2000); // 2 seconds delay
      return () => clearTimeout(timer);
    }
  }, [step]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen} modal>
      <DialogPortal>
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-md">
          <DialogContent
            ref={dialogRef}
            className={`sm:max-w-2xl max-h-[90vh] overflow-y-auto ${isRTL ? "text-right" : "text-left"
              } ${isRTL
                ? "[&_[data-slot=dialog-close]]:left-4 [&_[data-slot=dialog-close]]:right-auto [&_[data-slot=dialog-close]]:cursor-pointer"
                : "[&_[data-slot=dialog-close]]:cursor-pointer"
              }`}
            style={{ direction: isRTL ? "rtl" : "ltr" }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="dialog-title"
            onInteractOutside={(e) => e.preventDefault()}
          >
            <DialogHeader className={isRTL ? "text-right" : "text-left"}>
              <DialogTitle
                className={`flex items-center ${isRTL ? "justify-start" : "justify-between"
                  }`}
              >
                {step === 1
                  ? t("bookingFunnel.step1.title")
                  : step === 2
                    ? t("bookingFunnel.step2.title")
                    : step === 3
                      ? t("bookingFunnel.step3.title")
                      : step === 4
                        ? t("bookingFunnel.step4.title")
                        : t("bookingFunnel.step5.title")}
                <span id="dialog-title" className="sr-only">
                  {step === 1
                    ? t("bookingFunnel.step1.title")
                    : step === 2
                      ? t("bookingFunnel.step2.title")
                      : step === 3
                        ? t("bookingFunnel.step3.title")
                        : step === 4
                          ? t("bookingFunnel.step4.title")
                          : t("bookingFunnel.step5.title")}
                </span>
              </DialogTitle>
              <Progress
                value={Math.round((step / 5) * 100)}
                className="mt-4"
                isRTL={isRTL}
              />
            </DialogHeader>

            <div className="py-4 space-y-6">
              {step === 1 && (
                <>
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      {t("bookingFunnel.step1.description")}
                    </p>
                    <RadioGroup
                      value={opportunity}
                      onValueChange={setOpportunity}
                    >
                      {OPPORTUNITY_OPTIONS.map((option) => (
                        <div
                          key={option.value}
                          className="flex items-center w-full p-2 rounded-md hover:bg-muted/50 transition-colors cursor-pointer gap-4"
                        >
                          {isRTL ? (
                            <>
                              <RadioGroupItem
                                value={option.value}
                                id={option.value}
                                aria-label={`Select opportunity ${option.label}`}
                                ref={
                                  option.value === "Automate workflows"
                                    ? firstFocusableRef
                                    : undefined
                                }
                              />
                              <Label
                                htmlFor={option.value}
                                className="cursor-pointer flex-1 text-right"
                              >
                                {option.label}
                              </Label>
                            </>
                          ) : (
                            <>
                              <RadioGroupItem
                                value={option.value}
                                id={option.value}
                                aria-label={`Select opportunity ${option.label}`}
                                ref={
                                  option.value === "Automate workflows"
                                    ? firstFocusableRef
                                    : undefined
                                }
                              />
                              <Label
                                htmlFor={option.value}
                                className="cursor-pointer flex-1 text-left"
                              >
                                {option.label}
                              </Label>
                            </>
                          )}
                        </div>
                      ))}
                    </RadioGroup>
                    {opportunity === "Other" && (
                      <div className="pt-2">
                        <Label
                          htmlFor="otherOpportunity"
                          className={isRTL ? "text-right" : "text-left"}
                        >
                          {t("bookingFunnel.step1.otherLabel")}
                        </Label>
                        <Input
                          id="otherOpportunity"
                          value={otherOpportunity}
                          onChange={(e) =>
                            setOtherOpportunity(e.target.value.slice(0, 50))
                          }
                          placeholder={t(
                            "bookingFunnel.step1.otherPlaceholder"
                          )}
                          maxLength={50}
                          className={`mt-1 ${isRTL ? "text-right" : "text-left"}`}
                          style={{ direction: isRTL ? "rtl" : "ltr" }}
                          aria-describedby="other-opportunity-count"
                        />
                        <p
                          id="other-opportunity-count"
                          className="text-xs text-muted-foreground mt-1 sr-only"
                        >
                          {otherOpportunity.length} of 50 characters
                        </p>
                        <p
                          className={`text-xs text-muted-foreground mt-1 ${isRTL ? "text-right" : "text-left"}`}
                          aria-hidden="true"
                        >
                          {otherOpportunity.length}/50
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="flex justify-end">
                    <Button
                      onClick={handleContinueStep1}
                      disabled={!canContinueStep1}
                      aria-label="Continue to next step"
                    >
                      {t("bookingFunnel.step1.continue")}
                    </Button>
                  </div>
                </>
              )}

              {step === 2 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      {t("bookingFunnel.step2.description")}
                    </p>
                    <RadioGroup
                      value={transformation}
                      onValueChange={setTransformation}
                    >
                      {TRANSFORMATION_OPTIONS.map((option) => (
                        <div
                          key={option.value}
                          className="flex items-center w-full p-2 rounded-md hover:bg-muted/50 transition-colors cursor-pointer gap-4"
                        >
                          {isRTL ? (
                            <>
                              <RadioGroupItem
                                value={option.value}
                                id={`transform-${option.value}`}
                                aria-label={`Select transformation ${option.label}`}
                              />
                              <Label
                                htmlFor={`transform-${option.value}`}
                                className="cursor-pointer flex-1 text-right"
                              >
                                {option.label}
                              </Label>
                            </>
                          ) : (
                            <>
                              <RadioGroupItem
                                value={option.value}
                                id={`transform-${option.value}`}
                                aria-label={`Select transformation ${option.label}`}
                              />
                              <Label
                                htmlFor={`transform-${option.value}`}
                                className="cursor-pointer flex-1 text-left"
                              >
                                {option.label}
                              </Label>
                            </>
                          )}
                        </div>
                      ))}
                    </RadioGroup>
                    {transformation === "Other" && (
                      <div className="pt-2">
                        <Label
                          htmlFor="otherTransformation"
                          className={isRTL ? "text-right" : "text-left"}
                        >
                          {t("bookingFunnel.step2.otherLabel")}
                        </Label>
                        <Input
                          id="otherTransformation"
                          value={otherTransformation}
                          onChange={(e) =>
                            setOtherTransformation(e.target.value.slice(0, 50))
                          }
                          placeholder={t(
                            "bookingFunnel.step2.otherPlaceholder"
                          )}
                          maxLength={50}
                          className={`mt-1 ${isRTL ? "text-right" : "text-left"}`}
                          style={{ direction: isRTL ? "rtl" : "ltr" }}
                          aria-describedby="other-transform-count"
                        />
                        <p
                          id="other-transform-count"
                          className="text-xs text-muted-foreground mt-1 sr-only"
                        >
                          {otherTransformation.length} of 50 characters
                        </p>
                        <p
                          className={`text-xs text-muted-foreground mt-1 ${isRTL ? "text-right" : "text-left"}`}
                          aria-hidden="true"
                        >
                          {otherTransformation.length}/50
                        </p>
                      </div>
                    )}
                  </div>
                  <div
                    className={`flex gap-2 ${isRTL ? "justify-start flex-row-reverse" : "justify-end"
                      }`}
                  >
                    <Button
                      variant="outline"
                      onClick={() => setStep(1)}
                      className={isRTL ? "" : "mr-auto"}
                    >
                      {t("bookingFunnel.step2.back")}
                    </Button>
                    <Button
                      onClick={handleContinueStep2}
                      disabled={!canContinueStep2}
                      className="continue-step2"
                    >
                      {t("bookingFunnel.step2.continue")}
                    </Button>
                  </div>
                </motion.div>
              )}
              {step === 3 && (
                <>
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      {t("bookingFunnel.step3.description")}
                    </p>

                    <div>
                      <Label className={`text-sm font-medium ${isRTL ? "text-right" : "text-left"}`}>
                        {t("bookingFunnel.step3.timelineLabel")}
                      </Label>
                      <RadioGroup
                        value={timeline}
                        onValueChange={setTimeline}
                        className="pt-2 space-y-2"
                      >
                        {TIMELINE_OPTIONS.map((option) => (
                          <div
                            key={option.value}
                            className="flex items-center w-full p-2 rounded-md hover:bg-muted/50 transition-colors cursor-pointer gap-4"
                          >
                            {isRTL ? (
                              <>
                                <RadioGroupItem
                                  value={option.value}
                                  id={`timeline-${option.value}`}
                                  aria-label={`Select timeline ${option.label}`}
                                />
                                <Label
                                  htmlFor={`timeline-${option.value}`}
                                  className="cursor-pointer flex-1 text-right"
                                >
                                  {option.label}
                                </Label>
                              </>
                            ) : (
                              <>
                                <RadioGroupItem
                                  value={option.value}
                                  id={`timeline-${option.value}`}
                                  aria-label={`Select timeline ${option.label}`}
                                />
                                <Label
                                  htmlFor={`timeline-${option.value}`}
                                  className="cursor-pointer flex-1 text-left"
                                >
                                  {option.label}
                                </Label>
                              </>
                            )}
                          </div>
                        ))}
                      </RadioGroup>
                    </div>

                    <div>
                      <Label className={`text-sm font-medium ${isRTL ? "text-right" : "text-left"}`}>
                        {t("bookingFunnel.step3.budgetLabel")}
                      </Label>
                      <RadioGroup
                        value={budget}
                        onValueChange={setBudget}
                        className="pt-2 space-y-2"
                      >
                        {BUDGET_OPTIONS.map((option) => (
                          <div
                            key={option.value}
                            className="flex items-center w-full p-2 rounded-md hover:bg-muted/50 transition-colors cursor-pointer gap-4"
                          >
                            {isRTL ? (
                              <>
                                <RadioGroupItem
                                  value={option.value}
                                  id={`budget-${option.value}`}
                                  aria-label={`Select budget ${option.label}`}
                                />
                                <Label
                                  htmlFor={`budget-${option.value}`}
                                  className="cursor-pointer flex-1 text-right"
                                >
                                  {option.label}
                                </Label>
                              </>
                            ) : (
                              <>
                                <RadioGroupItem
                                  value={option.value}
                                  id={`budget-${option.value}`}
                                  aria-label={`Select budget ${option.label}`}
                                />
                                <Label
                                  htmlFor={`budget-${option.value}`}
                                  className="cursor-pointer flex-1 text-left"
                                >
                                  {option.label}
                                </Label>
                              </>
                            )}
                          </div>
                        ))}
                      </RadioGroup>
                    </div>
                  </div>
                  <div
                    className={`flex gap-2 ${isRTL ? "justify-start flex-row-reverse" : "justify-end"
                      }`}
                  >
                    <Button
                      variant="outline"
                      onClick={() => setStep(2)}
                      className={isRTL ? "" : "mr-auto"}
                    >
                      {t("bookingFunnel.step3.back")}
                    </Button>
                    <Button
                      onClick={handleContinueStep3}
                      disabled={!canContinueStep3}
                      aria-label="Continue"
                    >
                      {t("bookingFunnel.step3.continue")}
                    </Button>
                  </div>
                </>
              )}
              {step === 4 && (
                <>
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      {t("bookingFunnel.step4.description")}
                    </p>
                    <div>
                      <Label
                        htmlFor="gameChanger"
                        className={`text-sm font-medium ${isRTL ? "text-right" : "text-left"}`}
                      >
                        {t("bookingFunnel.step4.label")}
                      </Label>
                      <textarea
                        id="gameChanger"
                        value={gameChanger}
                        onChange={(e) => setGameChanger(e.target.value)}
                        placeholder={t("bookingFunnel.step4.placeholder")}
                        className={`mt-2 min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none ${isRTL ? "text-right" : "text-left"
                          }`}
                        style={{ direction: isRTL ? "rtl" : "ltr" }}
                        maxLength={300}
                      />
                      <p className={`text-xs text-muted-foreground mt-1 ${isRTL ? "text-right" : "text-left"}`}>
                        {gameChanger.length}/300 characters
                      </p>
                    </div>
                  </div>
                  <div
                    className={`flex gap-2 ${isRTL ? "justify-start flex-row-reverse" : "justify-end"
                      }`}
                  >
                    <Button
                      variant="outline"
                      onClick={() => setStep(3)}
                      className={isRTL ? "" : "mr-auto"}
                    >
                      {t("bookingFunnel.step4.back")}
                    </Button>
                    <Button
                      onClick={handleContinueStep4}
                      disabled={!canContinueStep4 || isSubmitting}
                      aria-label="Continue to schedule call"
                    >
                      {isSubmitting
                        ? t("bookingFunnel.step4.submitting")
                        : t("bookingFunnel.step4.submit")}
                    </Button>
                  </div>
                </>
              )}

              {step === 5 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="space-y-4 text-center">
                    <p className="text-lg font-semibold">
                      {t("bookingFunnel.step5.message")}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {t("bookingFunnel.step5.fallback")}{" "}
                      <a
                        href={CALENDLY_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary underline"
                      >
                        {t("bookingFunnel.step5.clickHere")}
                      </a>
                      .
                    </p>
                  </div>
                </motion.div>
              )}
            </div>
          </DialogContent>
        </div>
      </DialogPortal>
    </Dialog>
  );
}
