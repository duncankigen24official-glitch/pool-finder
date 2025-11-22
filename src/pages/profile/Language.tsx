import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const Language = () => {
  const navigate = useNavigate();
  const [selectedLanguage, setSelectedLanguage] = useState("english");

  const languages = [
    { value: "english", label: "English" },
    { value: "hindi", label: "हिंदी" },
    { value: "indonesian", label: "Indonesian" },
    { value: "chinese", label: "中国人" },
    { value: "arabic", label: "عربي" },
  ];

  const handleUpdate = () => {
    toast.success("Language updated successfully");
    navigate("/profile");
  };

  return (
    <PageLayout title="Language" showBackButton>
      <div className="px-4 py-6 space-y-6 min-h-[calc(100vh-12rem)] flex flex-col">
        {/* Language Options */}
        <RadioGroup value={selectedLanguage} onValueChange={setSelectedLanguage} className="flex-1">
          <div className="space-y-3">
            {languages.map((language) => (
              <div
                key={language.value}
                className="flex items-center justify-between bg-card border border-border rounded-lg p-4"
              >
                <Label
                  htmlFor={language.value}
                  className="text-base font-normal flex-1 cursor-pointer"
                >
                  {language.label}
                </Label>
                <RadioGroupItem value={language.value} id={language.value} />
              </div>
            ))}
          </div>
        </RadioGroup>

        {/* Update Button */}
        <div className="sticky bottom-4">
          <Button onClick={handleUpdate} className="w-full h-12 text-base">
            Update
          </Button>
        </div>
      </div>
    </PageLayout>
  );
};

export default Language;
