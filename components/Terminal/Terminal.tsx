import classNames from "classnames";
import { useEffect, useState } from "react";
import sick from "sick-colors";
import { SketchPicker } from "react-color";
import styled from "styled-components";
import { IoMdDownload } from "react-icons/io";
import { generate } from "../../lib/file";
import { Color, Colors, isLightOrDark } from "lib/colors";
import { Line } from "./Line";
import { Indent } from "./Indent";
import { normalize } from "lib/string";

export const Terminal = () => {
  const [name, setName] = useState("mycolorscheme");
  const [mouse, setMouse] = useState({ top: 0, left: 0 });
  const [colors, setColors] = useState<Colors>({
    bg: sick.background,
    fg: sick.foreground,
    comments: sick.magenta,
    menus: sick.black,
    color1: sick.red,
    color2: sick.green,
    color3: sick.yellow,
    color4: sick.blue,
    color5: sick.magenta,
    color6: sick.cyan,
  });
  const [darkLight, setDarkLight] = useState<"dark" | "light">(
    isLightOrDark(colors.bg)
  );
  const [activePicker, setActivePicker] = useState<Color | null>(null);

  const onTokenClicked =
    (color: Color) =>
    (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
      event.stopPropagation();
      activePicker === color ? setActivePicker(null) : setActivePicker(color);
      setMouse({ top: event.clientY, left: event.clientX });
    };

  const Token = ({
    children,
    c,
    inverted,
    full,
  }: {
    children?: React.ReactNode;
    c: Color;
    inverted?: boolean;
    full?: boolean;
  }) => {
    const [mouseOver, setMouseOver] = useState(false);
    return (
      <div
        className="inline-flex cursor-pointer"
        style={{
          color: inverted ? colors.fg : colors[c],
          backgroundColor: inverted ? colors[c] : colors.bg,
          textDecoration: mouseOver ? "underline" : "",
          width: full ? "100%" : "auto",
        }}
        onClick={onTokenClicked(c)}
        onMouseOver={() => setMouseOver(true)}
        onMouseLeave={() => setMouseOver(false)}
      >
        {children}
      </div>
    );
  };

  const W1 = ({ children }: { children?: React.ReactNode }) => (
    <Token c="color1">{children}</Token>
  );
  const W2 = ({ children }: { children?: React.ReactNode }) => (
    <Token c="color2">{children}</Token>
  );
  const W3 = ({ children }: { children?: React.ReactNode }) => (
    <Token c="color3">{children}</Token>
  );
  const W4 = ({ children }: { children?: React.ReactNode }) => (
    <Token c="color4">{children}</Token>
  );
  const W5 = ({ children }: { children?: React.ReactNode }) => (
    <Token c="color5">{children}</Token>
  );
  const W6 = ({ children }: { children?: React.ReactNode }) => (
    <Token c="color6">{children}</Token>
  );
  const Comment = ({ children }: { children?: React.ReactNode }) => (
    <Token c="comments">{children}</Token>
  );

  const Square = ({ c }: { c: Color }) => (
    <div
      className={classNames("w-10 h-10 md:w-4 md:h-4 cursor-pointer")}
      style={{ backgroundColor: colors[c] }}
      onClick={onTokenClicked(c)}
    />
  );

  const Picker = () => {
    const OverridePickerColors = styled.div`
      input {
        color: ${colors.fg};
      }
      label {
        color: ${colors.fg} !important;
      }
    `;
    return (
      <OverridePickerColors>
        <div
          className="absolute"
          style={{
            zIndex: 1000,
            top: mouse.top,
            left: mouse.left,
          }}
          onClick={(ev) => ev.stopPropagation()}
        >
          <SketchPicker
            color={colors[activePicker]}
            onChangeComplete={(color) =>
              setColors({ ...colors, [activePicker]: color.hex })
            }
            styles={{
              default: {
                picker: {
                  background: colors.bg,
                },
              },
            }}
          />
        </div>
      </OverridePickerColors>
    );
  };

  const downloadClicked = () => {
    generate(name, colors, darkLight);
  };

  const handleBackgroundClick = () => setActivePicker(null);

  useEffect(() => {
    document.body.addEventListener("click", handleBackgroundClick);
    return () => {
      document.body.removeEventListener("click", handleBackgroundClick);
    };
  }, []);

  const setGlobalDarkLight = (darkLight: "dark" | "light") => {
    setDarkLight(darkLight);
    if (document.body.classList.contains("dark") && darkLight === "light") {
      window["__toggleDarkMode"]?.();
    } else if (
      !document.body.classList.contains("dark") &&
      darkLight === "dark"
    ) {
      window["__toggleDarkMode"]?.();
    }
  };

  useEffect(() => {
    setGlobalDarkLight(isLightOrDark(colors.bg));
  }, [colors.bg]);

  return (
    <>
      {activePicker && <Picker />}
      <section className="mt-4 relative">
        <div className="relative bg-[rgb(60,80,80)] w-full h-[23px] flex items-center pl-1 rounded-t-md">
          <div className="bg-[rgb(255,95,87)] rounded-full w-3 h-3 mx-1" />
          <div className="bg-[rgb(255,188,46)] rounded-full w-3 h-3 mx-1" />
          <div className="bg-[rgb(43,200,64)] rounded-full w-3 h-3 mx-1" />
        </div>
        <div className="absolute z-10 top-7 right-14 md:right-8 border border-gray-600 rounded-sm">
          <Square c="bg" />
          <Square c="fg" />
        </div>
        <div className="absolute z-10 top-7 right-2 border border-gray-600 rounded-sm">
          <Square c="color1" />
          <Square c="color2" />
          <Square c="color3" />
          <Square c="color4" />
          <Square c="color5" />
          <Square c="color6" />
        </div>
        <div
          className="p-3 pb-0 border rounded-b-md relative overflow-x-auto overflow-y-hidden"
          style={{ color: colors.fg, backgroundColor: colors.bg }}
          onClick={handleBackgroundClick}
        >
          <Line>
            <W5>import</W5> <W1>vimColors</W1> <W5>from</W5>{" "}
            <W3>&quot;vim-colors&quot;</W3>;
          </Line>
          <Line />
          <Line>
            <Comment>{"//"} We&apos;ll use this later</Comment>
          </Line>
          <Line>
            <W2>function</W2> <W4>poweredBy</W4>() {"{"}
          </Line>
          <Indent>
            <Line>
              <W1>console</W1>.<W4>log</W4>(
              <W3>{'"powered by vimcolors.org"'}</W3>);
            </Line>
          </Indent>
          <Line>{"}"}</Line>
          <Line />
          <Line>
            <W2>class</W2> <W1>Theme</W1> <W6>{"{"}</W6>
          </Line>
          <Indent>
            <Line>
              <W3>constructor</W3>(<W1>name</W1>: <W1>string</W1>) {"{"}
            </Line>
            <Indent>
              <Line>
                <W1>this</W1>.<W1>name</W1> = <W1>name</W1>
              </Line>
            </Indent>
            <Line>{"}"}</Line>
            <Line>
              <W1>public</W1> <W2>static</W2> <W4>poweredBy</W4>() {"{"}
            </Line>
            <Indent>
              <Line>
                <W4>poweredBy</W4>();
              </Line>
            </Indent>
            <Line>
              <Line>{"}"}</Line>
            </Line>
            <Line>
              <W2>public</W2> <W4>getColorschemeName</W4>() {"{"}
            </Line>
            <Indent>
              <Line>
                <W2>return</W2> <W1>this</W1>.<W1>name</W1>;
              </Line>
            </Indent>
            <Line>
              <Line>{"}"}</Line>
            </Line>
          </Indent>
          <Line>
            <Line>{"}"}</Line>
          </Line>
          <Line />
          <Line>
            <W2>export</W2> <W2>const</W2> <W1>theme</W1> <W6>=</W6>{" "}
            <W2>new</W2> <W1>Theme</W1>(<W3>&quot;{name}&quot;</W3>);
          </Line>
          <Line className="mt-2 -ml-3 -mr-3">
            <Token c="menus" inverted full>
              <div className="flex gap-2 w-full">
                <span
                  className="border-r px-2 "
                  style={{
                    borderColor: colors.fg,
                    color: colors.menus,
                    backgroundColor: colors.fg,
                  }}
                >
                  Normal
                </span>
                <span>{name}.ts</span>
              </div>
              <span className="mr-2">typescript</span>
            </Token>
          </Line>
        </div>
      </section>
      <div className="flex flex-col md:flex-row items-center justify-center mt-4 gap-4">
        <div className="flex gap-1 items-center">
          <label htmlFor="name">Name:</label>
          <input
            name="name"
            type="text"
            value={name}
            onChange={(ev) => setName(normalize(ev.target.value))}
            className="bg-bg py-1 px-2 rounded-md outline-none text-accent"
          />
        </div>
        <div className="bg-bg rounded-full border shadow-md p-[2px]">
          <button
            onClick={() => setGlobalDarkLight("dark")}
            className={classNames(
              "font-sans font-semibold px-3 py-1 rounded-full transition-colors mr-1",
              {
                "bg-accent2 text-bg": darkLight === "dark",
                "opacity-60": darkLight === "light",
              }
            )}
          >
            Dark
          </button>
          <button
            onClick={() => setGlobalDarkLight("light")}
            className={classNames(
              "font-sans font-semibold px-3 py-1 rounded-full transition-colors",
              {
                "bg-accent2 text-bg": darkLight === "light",
                "opacity-60": darkLight === "dark",
              }
            )}
          >
            Light
          </button>
        </div>
        <button
          onClick={() => downloadClicked()}
          className="flex items-center gap-2 bg-accent2 text-bg px-3 py-1 rounded-md hover:bg-accent3 hover:scale-110 transition"
        >
          <IoMdDownload /> Download
        </button>
      </div>
    </>
  );
};
