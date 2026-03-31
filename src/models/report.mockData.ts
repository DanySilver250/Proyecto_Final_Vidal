import type { Report } from "./report";

export const MOCK_REPORTS: Report[] = [
  {
    id: "1",
    title: "Fuga de agua en el baño",
    description: "Hay una fuga de agua constante en el baño del segundo piso.",
    priority: "Alta",
    user: { name: "Juan Pérez" },
  },
  {
    id: "2",
    title: "Luz parpadeante en la oficina",
    description: "La luz de la oficina principal parpadea constantemente.",
    priority: "Media",
    user: { name: "Valeria Ortiz" },
  },
  {
    id: "3",
    title: "Puerta del almacén dañada",
    description: "La puerta del almacén no cierra correctamente.",
    priority: "Baja",
    user: { name: "Carlos Gómez" },
  },
];