"use client";

import { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface DetailField {
    label: string;
    value: string;
    className?: string;
    span?: "full" | "half";
}

interface SelectOption {
    value: string;
    label: string;
    subtitle?: string;
}

interface DetailCardProps {
    icon: ReactNode;
    title: string;
    description: string;
    selectLabel: string;
    selectPlaceholder: string;
    options: SelectOption[];
    selectedData?: any;
    fields?: DetailField[];
    onSelect: (value: string) => void;
    onAdd?: () => void;
    className?: string;
    iconColor?: string;
}

export function DetailCard({
    icon,
    title,
    description,
    selectLabel,
    selectPlaceholder,
    options,
    selectedData,
    fields,
    onSelect,
    onAdd,
    className,
    iconColor = "primary",
}: DetailCardProps) {
    const getIconColorClasses = (color: string) => {
        const colorMap = {
            primary: "from-primary/20 via-primary/10 to-transparent text-primary",
            blue: "from-blue-500/20 via-blue-400/10 to-transparent text-blue-600 dark:text-blue-400",
            purple: "from-purple-500/20 via-purple-400/10 to-transparent text-purple-600 dark:text-purple-400",
            green: "from-green-500/20 via-green-400/10 to-transparent text-green-600 dark:text-green-400",
            orange: "from-orange-500/20 via-orange-400/10 to-transparent text-orange-600 dark:text-orange-400",
        };
        return colorMap[color as keyof typeof colorMap] || colorMap.primary;
    };

    const getDotColorClasses = (color: string) => {
        const colorMap = {
            primary: "from-primary to-primary/80",
            blue: "from-blue-500 to-blue-400",
            purple: "from-purple-500 to-purple-400",
            green: "from-green-500 to-green-400",
            orange: "from-orange-500 to-orange-400",
        };
        return colorMap[color as keyof typeof colorMap] || colorMap.primary;
    };

    return (
        <Card className={cn("group relative overflow-hidden rounded-3xl border border-border/50 bg-card backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:border-primary/30", className)}>
            {/* Subtle decorative elements - much more minimal */}
            <div className="absolute inset-0 bg-gradient-to-br from-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className={cn("absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-5 group-hover:opacity-10 transition-opacity duration-300", `bg-${iconColor}-500/20`)} />

            <CardHeader className="relative pb-6 px-6 sm:px-8 pt-8">
                <CardTitle className="flex items-start gap-4 sm:gap-5">
                    <div className={cn("relative bg-gradient-to-br p-3 sm:p-4 rounded-2xl shrink-0 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110", `${getIconColorClasses(iconColor).split(' ').slice(0, 3).join(' ')}`)}>
                        <div className={cn("w-6 h-6 sm:w-7 sm:h-7 relative z-10", getIconColorClasses(iconColor).split(' ').slice(-1)[0])}>
                            {icon}
                        </div>
                        {/* Icon glow effect */}
                        <div className={cn("absolute inset-0 rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-300", `bg-gradient-to-br ${getDotColorClasses(iconColor)}`)} />
                    </div>
                    <div className="min-w-0 flex-1">
                        <h3 className="text-xl sm:text-2xl font-bold text-foreground leading-tight mb-2 group-hover:text-primary transition-colors duration-300">
                            {title}
                        </h3>
                        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                            {description}
                        </p>
                    </div>
                </CardTitle>
            </CardHeader>

            <CardContent className="relative space-y-8 sm:space-y-10 px-6 sm:px-8 pb-8">
                {/* Selection Section */}
                <div className="space-y-5">
                    <div className="flex items-center gap-3">
                        <div className={cn("w-3 h-3 rounded-full bg-gradient-to-r shadow-lg", getDotColorClasses(iconColor))}></div>
                        <Label className="text-base font-bold text-foreground">
                            {selectLabel}
                        </Label>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 lg:w-1/3">
                        <Select onValueChange={onSelect}>
                            <SelectTrigger className="flex-1 lg:py-8 h-16 bg-background border-2 border-border hover:border-primary/50 focus:border-primary rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 text-base font-medium">
                                <SelectValue placeholder={selectPlaceholder} className="text-muted-foreground" />
                            </SelectTrigger>
                            <SelectContent className="z-50 rounded-2xl border-0 shadow-2xl bg-card/95 backdrop-blur-xl">
                                {options.map((option) => (
                                    <SelectItem
                                        key={option.value}
                                        value={option.value}
                                        className="text-sm rounded-xl hover:bg-accent/60 transition-all duration-200 py-4 px-4 my-1 mx-2"
                                    >
                                        <div className="flex flex-col gap-1">
                                            <span className="font-semibold text-foreground">{option.label}</span>
                                            {option.subtitle && (
                                                <span className="text-xs text-muted-foreground">{option.subtitle}</span>
                                            )}
                                        </div>
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        
                    </div>
                </div>

                {/* Selected Data Display */}
                {selectedData && fields && (
                    <div className="relative overflow-hidden bg-accent/5 dark:bg-accent/10 backdrop-blur-sm">
                        {/* Minimal decorative element */}
                        <div className="absolute inset-0 bg-gradient-to-br from-transparent to-accent/5 opacity-50" />

                        <div className="relative space-y-4">
                            <div className="flex items-center gap-4 pb-2">
                                <div className={cn("w-3 h-3 rounded-full bg-gradient-to-r shadow-lg", getDotColorClasses(iconColor))}></div>
                                <h4 className="text-lg sm:text-xl font-bold text-foreground">Selected Information</h4>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                {fields.map((field, index) => (
                                    <div
                                        key={index}
                                        className={cn(
                                            "group/field space-y-2",
                                            field.span === "full" && "lg:col-span-2"
                                        )}
                                    >
                                        <Label className="text-xs font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                                            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground/40"></div>
                                            {field.label}
                                        </Label>
                                        <div className="relative bg-card  transition-all duration-300">
                                            <p className={cn(
                                                "text-foreground leading-relaxed break-words",
                                                field.className || "text-base font-semibold"
                                            )}>
                                                {field.value}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}