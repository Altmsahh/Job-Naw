"use client"
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Image from "next/image";


export default function ImageUI() {
    const [activeTab, setActiveTab] = useState("organize")

    return (

        <section className="border-t border-border bg-muted py-16">
            <div className="container mx-auto px-4">
                <div className="mx-auto max-w-6xl">
                    <div className="flex-gap-2 justify-center">
                        <Button className={`font-medium text-sm px-6 py-3 rounded-lg transition-colors ${activeTab === 'organize' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'} `} onClick={() => setActiveTab("organize")} >organize Application</Button>
                        <Button className={`font-medium text-sm px-6 py-3 rounded-lg transition-colors ${activeTab === 'hired' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'} `} onClick={() => setActiveTab("hired")} >Get Hired</Button>
                        <Button className={`font-medium text-sm px-6 py-3 rounded-lg transition-colors ${activeTab === 'boards' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'} `} onClick={() => setActiveTab("boards")} >Manage Boards</Button>
                    </div>
                    <div className="relative mx-auto max-w-5lx overflow-hidden rounded-lg border border-border shadow-lg mt-4 ">
                        {activeTab === "organize" && (
                            <Image src="/hero-imgs/hero1.png" alt="Board 1" width={1200} height={600} />
                        )}
                        {activeTab === "hired" && (
                            <Image src="/hero-imgs/hero2.png" alt="Board 2" width={1200} height={600} />
                        )}
                        {activeTab === "boards" && (
                            <Image src="/hero-imgs/hero3.png" alt="Board 3" width={1200} height={600} />
                        )}

                    </div>
                </div>
            </div>
        </section>
    )
}
