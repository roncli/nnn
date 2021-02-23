import Encoding from "../../public/js/common/encoding"
import Font from "../../public/js/common/font"
import Matches from "../../public/js/matches"
import SpriteFont from "../../public/js/spriteFont/spriteFont"
import Template from "../../public/js/common/template"
import Time from "../../public/js/common/time"

export {}

declare global {
    interface Window {
        Encoding: typeof Encoding
        Font: typeof Font
        Matches: typeof Matches
        SpriteFont: typeof SpriteFont
        Template: typeof Template
        Time: typeof Time
    }
}
