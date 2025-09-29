import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Language } from '@/types';
import { t } from '@/lib/translations';
import { PageLayout } from '@/components/layout/PageLayout';

interface InstructionsScreenProps {
  language: Language;
  onBackToHome: () => void;
}

export function InstructionsScreen({ language, onBackToHome }: InstructionsScreenProps) {
  const rules = [t('rule1', language), t('rule2', language), t('rule3', language), t('rule4', language), t('rule5', language)];
  
  return (
    <PageLayout>
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            {t('instructionsTitle', language)}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 text-gray-700">
            {rules.map((rule, index) => (
              <div key={index} className="flex items-start gap-3">
                <span className="w-6 h-6 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  {index + 1}
                </span>
                <p>{rule}</p>
              </div>
            ))}
          </div>
          
          <Button onClick={onBackToHome} className="w-full mt-6" size="lg">
            {t('backToHome', language)}
          </Button>
        </CardContent>
      </Card>
    </PageLayout>
  );
}