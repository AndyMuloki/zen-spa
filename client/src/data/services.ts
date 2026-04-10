import { type Service } from "@shared/schema";

export const services: Service[] = [
  {
    id: 1,
    name: "Swedish Massage",
    description: "A gentle, relaxing full-body massage that improves circulation, eases muscle tension, and promotes overall well-being.",
    image: "https://placehold.co/600x400?text=Swedish+Massage",
    price: 80,
    duration: 60,
  },
  {
    id: 2,
    name: "Deep Tissue Massage",
    description: "Targets deeper layers of muscle and connective tissue to relieve chronic pain and stubborn tension.",
    image: "https://placehold.co/600x400?text=Deep+Tissue",
    price: 95,
    duration: 60,
  },
  {
    id: 3,
    name: "Hot Stone Massage",
    description: "Warm basalt stones are used to melt away tension, ease muscle stiffness and increase circulation.",
    image: "https://placehold.co/600x400?text=Hot+Stone",
    price: 110,
    duration: 75,
  },
  {
    id: 4,
    name: "Aromatherapy Massage",
    description: "Combines the power of essential oils with therapeutic massage to calm the mind and restore balance.",
    image: "https://placehold.co/600x400?text=Aromatherapy",
    price: 90,
    duration: 60,
  },
  {
    id: 5,
    name: "Sports Massage",
    description: "Designed for athletes and active individuals to prevent injury, reduce recovery time and enhance performance.",
    image: "https://placehold.co/600x400?text=Sports+Massage",
    price: 100,
    duration: 60,
  },
  {
    id: 6,
    name: "Prenatal Massage",
    description: "A nurturing massage specially adapted for expectant mothers to relieve discomfort and promote relaxation.",
    image: "https://placehold.co/600x400?text=Prenatal+Massage",
    price: 85,
    duration: 60,
  },
];
