import BackendAPI from 'src/services/BackendAPI';
import WikipediaAPI from 'src/services/WikipediaAPI';
import { WikiDocResponse } from '../BackendAPI/Wiki/WikiDoc';
import { WikiSummaryResponse } from '../BackendAPI/Wiki/WikiSummary';
import { TerminalCommand } from '../TerminalCommandAbstract';

export class GoogleCommand extends TerminalCommand {
  returnsCount = 0;
  shouldBreak = false;

  config = {
    title: '&#9733; GOOGLE WIKI (GWK)',
    description: 'Google a wikipedia page',
    usage: ['gwk [OPTIONS] <query>'],
    options: [
      {
        minified: '-m',
        normal: '--min',
        description: 'minified',
        default: '1000ms',
      },
    ],
  };

  execute() {
    if (this.args.length == 1) {
      return this.showMissingArguments();
    }
    if (this.checkHelp()) {
      return this.help();
    }

    this.terminal.startLoading();

    let minified = false;
    let matchText = '';

    for (let i = 1; i < this.args.length; i++) {
      if (this.args[i] == '-m' || this.args[i] == '--min') {
        minified = true;
        continue;
      }
      if (matchText != '') {
        this.showTooManyArguments();
        return;
      }
      matchText = this.args[i];
    }

    BackendAPI.search(matchText)
      .then((res: WikiDocResponse) => {
        if (this.shouldBreak) {
          return;
        }

        if (res.data.length == 0) {
          this.terminal.printError('No results found');
        }

        if (!minified || res.data.length == 0) {
          this.terminal.printWarning(
            'warning: This test Database has just 10.000 out of 57.000.000 Wikipedia pages. For more, use <a href="https://en.wikipedia.org/w/index.php?title=Special:AllPages">Wikipedia All Pages</a> tool'
          );
        }

        if (res.data.length == 0) {
          this.finishExecution();
          return;
        }

        this.returnsCount = res.data.length;

        if (!minified) {
          for (let i = 0; i < res.data.length; i++) {
            const doc = res.data[i];
            const page_link = doc._source.href;

            WikipediaAPI.getPage(page_link.split('/').pop()!)
              .then((res: WikiSummaryResponse) => {
                if (this.shouldBreak) {
                  return;
                }
                const page = res.data;
                this.printTitle(doc._source.title, matchText, doc._source.href);
                this.printSummary(page.extract);
              })
              .catch(() => {
                if (this.shouldBreak) {
                  return;
                }
                this.printTitle(doc._source.title, matchText, page_link);
                this.terminal.printError("    Error: Couldn't find page");
              })
              .finally(() => {
                if (this.shouldBreak) {
                  return;
                }
                this.returnsCount -= 1;
                if (this.returnsCount == 0) {
                  this.finishExecution();
                }
              });
          }
        } else {
          for (let i = 0; i < res.data.length; i++) {
            const doc = res.data[i];
            const page_link = doc._source.href;
            this.printTitle(doc._source.title, matchText, page_link);
          }
          this.finishExecution();
        }
      })
      .catch(() => {
        if (this.shouldBreak) {
          return;
        }
        this.terminal.printError('Error: Request Failed');
        this.finishExecution();
      });
  }

  break() {
    this.shouldBreak = true;
    this.finishExecution();
  }

  printTitle(title: string, matchText: string, link: string) {
    this.terminal.println(
      '     ' +
        this.highlightText(title, matchText) +
        ' (<a href="https://en.wikipedia.org' +
        link +
        '">Link</a>)'
    );
  }

  printSummary(summary: string) {
    this.terminal.println('<div class="page_summary">' + summary + '</div>');
  }

  highlightText(text: string, highlight: string) {
    return text
      .replaceAll(new RegExp(highlight, 'gi'), (match) => {
        return '<span class="highlight">' + match + '</span>';
      })
      .replaceAll('"', '');
  }
}
