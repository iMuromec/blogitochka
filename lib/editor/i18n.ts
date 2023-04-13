// @ https://github.com/codex-team/editor.js/blob/next/example/example-i18n.html
/**
 * To provide localization of the editor.js you need to provide 'i18n' option with 'messages' dictionary:
 *
 * 1. At the 'ui' section of 'messages' there are translations for the internal editor.js UI elements.
 *   You can create or find/download a dictionary for your language
 *
 * 2. As long as tools list is a user-specific thing (we do not know which tools you use and under which names),
 *    so we can't provide a ready-to-use tool names dictionary.
 *    There is a 'toolNames' section for that reason. Put translations for the names of your tools there.
 *
 * 3. Also, the UI of the tools you use is also invisible to editor.js core.
 *    To pass translations for specific tools (that supports I18n API), there are 'tools' and 'blockTunes' section.
 *    Pass dictionaries for specific plugins through them.
 */

export const i18n = {
  /**
   * @type {I18nDictionary}
   */
  messages: {
    /**
     * Other below: translation of different UI components of the editor.js core
     */
    ui: {
      blockTunes: {
        toggler: {
          "Click to tune": "Нажмите, чтобы настроить",
          "or drag to move": "или перетащите",
        },
      },
      inlineToolbar: {
        converter: {
          "Convert to": "Конвертировать в",
        },
      },
      toolbar: {
        toolbox: {
          Add: "Добавить",
        },
      },
      popover: {
        Filter: "Поиск",
        "Nothing found": "Ничего не найдено",
      },
    },

    /**
     * Section for translation Tool Names: both block and inline tools
     */
    toolNames: {
      Text: "Параграф",
      Heading: "Заголовок",
      List: "Список",
      Warning: "Примечание",
      Checklist: "Чеклист",
      Quote: "Цитата",
      Code: "Код",
      Delimiter: "Разделитель",
      HTML: "HTML",
      Table: "Таблица",
      Link: "Ссылка",
      Marker: "Маркер",
      Bold: "Полужирный",
      Italic: "Курсив",
      InlineCode: "Моноширинный",
      Image: "Картинка",
    },

    /**
     * Section for passing translations to the external tools classes
     */
    tools: {
      /**
       * Each subsection is the i18n dictionary that will be passed to the corresponded plugin
       * The name of a plugin should be equal the name you specify in the 'tool' section for that plugin
       */
      warning: {
        // <-- 'Warning' tool will accept this dictionary section
        Title: "Название",
        Message: "Сообщение",
      },

      /**
       * Link is the internal Inline Tool
       */
      link: {
        "Add a link": "Вставьте ссылку",
      },
      /**
       * The "stub" is an internal block tool, used to fit blocks that does not have the corresponded plugin
       */
      stub: {
        "The block can not be displayed correctly.":
          "Блок не может быть отображен",
      },
      image: {
        Caption: "Подпись",
        "Select an Image": "Выберите файл",
        "With border": "Добавить рамку",
        "Stretch image": "Растянуть",
        "With background": "Добавить подложку",
      },
      code: {
        "Enter a code": "Код",
      },
      linkTool: {
        Link: "Ссылка",
        "Couldn't fetch the link data": "Не удалось получить данные",
        "Couldn't get this link data, try the other one":
          "Не удалось получить данные по ссылке, попробуйте другую",
        "Wrong response format from the server": "Неполадки на сервере",
      },
      header: {
        Header: "Заголовок",
      },
      paragraph: {
        "Enter something": "Введите текст",
      },
      list: {
        Ordered: "Нумерованный",
        Unordered: "Маркированный",
      },

      table: {
        "Delete row": "Удалить строку",
        "Add row above": "Добавить строку выше",
        "Add row below": "Добавить строку ниже",
        "Delete column": "Удалить столбец",
        "Add column to right": "Добавить столбец справа",
        "Add column to left": "Добавить столбец слева",
        "Without headings": "Без заголовка",
        "With headings": "С заголовком",
      },
    },

    /**
     * Section allows to translate Block Tunes
     */
    blockTunes: {
      /**
       * Each subsection is the i18n dictionary that will be passed to the corresponded Block Tune plugin
       * The name of a plugin should be equal the name you specify in the 'tunes' section for that plugin
       *
       * Also, there are few internal block tunes: "delete", "moveUp" and "moveDown"
       */
      delete: {
        Delete: "Удалить",
        "Click to delete": "Удалить",
      },

      moveUp: {
        "Move up": "Вверх",
      },
      moveDown: {
        "Move down": "Вниз",
      },
    },
  },
};
