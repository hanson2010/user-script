# User script

## Getting started

User scripts (a.k.a. Greasemonkey scripts) are small computer programs that change the layout of a page, add or remove new functionality and content, or automate actions within modern browsers, such as Chrome.

This approach is called as monkey patching, so the tools in which user scripts run are often named with the word "monkey".

## Install

- Install user script manager, such as [Tampermonkey](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo?hl=en) or [Violentmonkey](https://chrome.google.com/webstore/detail/violentmonkey/jinjaccalgkegednnccohejagnlnfdag?hl=en).
- Open installation page
- Select "Install from URL"
- Type in the raw url of a `.user.js` file here
- Enable auto update, if it's not default

## The collection

### AcWing Helper

AcWing is an Online Judge (OJ) for OIers.

This piece of user script is to help user to print the question page with a neat layout, or save a copy of the question in Markdown format.

- After the menu item of **Prepare to print** is clicked, it removes all unnecessary elements and append a date to the top right corner of the page. So you will get a printer-friendly AcWing question page, which you can go directly to print it with your favorite browser.
- After the menu item of **Show Markdown** is clicked, it create a text box for the raw string in Markdown format, and automatically copies it to your clipboard.

#### The URL

https://github.com/hanson2010/user-script/raw/main/AcWing-Helper.user.js

#### Changelog

- v1.2
  - Add prefix `ACW`
- v1.1
  - Remove two more buttons  
- v1.0
  - Prepare to print
  - Show Markdown

### CodeForces Helper

CodeForces is an Online Judge (OJ) for OIers.

This piece of user script is to help user to print the question page with a neat layout.

After the menu item of **Prepare to print** is clicked, it removes all unnecessary elements and append a date to the top right corner of the page. So you will get a printer-friendly CodeForces question page, which you can go directly to print it with your favorite browser.

#### The URL

https://github.com/hanson2010/user-script/raw/main/CodeForces-Helper.user.js

#### Changelog

- v1.0
  - Initial version

### Show Markdown

This user script add buttons to show source text for Markdown-rendered webpages.

#### The URL

https://github.com/hanson2010/user-script/raw/main/Show-Markdown.user.js

#### Changelog

- v1.1
  - Support more websites
    - [SegmentFault](https://segmentfault.com/blogs)
    - [力扣](https://leetcode.cn/problemset/all/)
    - [洛谷](https://www.luogu.com.cn/problem/list)
- v1.0
  - Tested with two websites
    - [AcWing](https://www.acwing.com/problem/)
    - [计蒜客](https://nanti.jisuanke.com/oi)

### Printer-friendly Taiwan Media

This user script removes all irrelevant elements, such as advertisements and buttons, with the piece of news you are browsing.

#### The URL

https://github.com/hanson2010/user-script/raw/main/Printer-friendly-Taiwan-Media.user.js

#### Changelog

- v0.1
  - Support for two websites
    - [中央通訊社](https://www.cna.com.tw/)
    - [聯合新聞網](https://udn.com/news/index)

## License

User script is licensed under the [MIT License](http://opensource.org/licenses/MIT).
