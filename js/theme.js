export function applyTheme(condition, temp) {

    const root = document.documentElement;

    switch (condition) {

        case "Clear":

            if (temp > 30) {

                root.style.setProperty(
                    "--gradient",
                    "linear-gradient(135deg,#FDB813,#FF7E29)"
                );

                root.style.setProperty(
                    "--accent",
                    "#ff9800"
                );

            }

            else {

                root.style.setProperty(
                    "--gradient",
                    "linear-gradient(135deg,#4facfe,#00f2fe)"
                );

                root.style.setProperty(
                    "--accent",
                    "#0284c7"
                );

            }

            break;

        case "Rain":

        case "Drizzle":

        case "Thunderstorm":

            root.style.setProperty(
                "--gradient",
                "linear-gradient(135deg,#4b79a1,#283e51)"
            );

            root.style.setProperty(
                "--accent",
                "#3b82f6"
            );

            break;

        case "Snow":

            root.style.setProperty(
                "--gradient",
                "linear-gradient(135deg,#e0f7fa,#ffffff)"
            );

            root.style.setProperty(
                "--accent",
                "#60a5fa"
            );

            break;

        case "Clouds":

            root.style.setProperty(
                "--gradient",
                "linear-gradient(135deg,#bdc3c7,#2c3e50)"
            );

            root.style.setProperty(
                "--accent",
                "#6b7280"
            );

            break;

        default:

            root.style.setProperty(
                "--gradient",
                "linear-gradient(135deg,#dbeafe,#bfdbfe)"
            );

            root.style.setProperty(
                "--accent",
                "#2563eb"
            );
    }

}