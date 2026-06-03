"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { useLocale } from "next-intl";
import { useState } from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const t = useTranslations("auth");
  const locale = useLocale();
  const [showPwd, setShowPwd] = useState(false);

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl border border-border p-8 shadow-sm">
          <div className="text-center mb-8">
            <h1 className="font-heading text-2xl font-bold text-gray-900 mb-2">
              {t("welcomeBack")}
            </h1>
            <p className="text-gray-500 text-sm">
              {t("noAccount")}{" "}
              <Link href={`/${locale}/register`} className="text-brand font-medium hover:underline">
                {t("signUp")}
              </Link>
            </p>
          </div>

          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">{t("email")}</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  className="w-full pl-11 pr-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand text-sm"
                  placeholder="name@example.com"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">{t("password")}</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPwd ? "text" : "password"}
                  className="w-full pl-11 pr-11 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand text-sm"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPwd(!showPwd)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2"
                >
                  {showPwd ? <EyeOff className="w-5 h-5 text-gray-400" /> : <Eye className="w-5 h-5 text-gray-400" />}
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-brand" />
                <span className="text-gray-600">Remember me</span>
              </label>
              <Link href={`/${locale}/forgot-password`} className="text-brand hover:underline">
                {t("forgotPassword")}
              </Link>
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-brand text-white font-semibold rounded-xl hover:bg-brand-700 transition-colors"
            >
              {t("signIn")}
            </button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200" /></div>
            <div className="relative flex justify-center"><span className="bg-white px-4 text-xs text-gray-400">{t("orContinueWith")}</span></div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {["Google", "GitHub"].map((provider) => (
              <button
                key={provider}
                className="py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                {provider}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
