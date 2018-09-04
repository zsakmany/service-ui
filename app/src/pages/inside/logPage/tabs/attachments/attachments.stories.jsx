/*
 * Copyright 2017 EPAM Systems
 *
 *
 * This file is part of EPAM Report Portal.
 * https://github.com/reportportal/service-ui
 *
 * Report Portal is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Report Portal is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with Report Portal.  If not, see <http://www.gnu.org/licenses/>.
 */

import { storiesOf } from '@storybook/react';
import { host } from 'storybook-host';
import { withReadme } from 'storybook-readme';
import Attachments from './attachments';
import README from './README.md';

function fetchAttachments() {
  return Promise.resolve(
    [...Array(20)].map((d, i) => ({
      id: i,
      src: 'http://dev.epm-rpp.projects.epam.com:8080/ui/img/launch/attachments/csv.svg',
      alt: 'It is only an icon for css attachments',
    })),
  );
}

const attachmentService = { fetchAttachments };

storiesOf('Pages/logPage/Attachment', module)
  .addDecorator(
    host({
      title: 'Log Attachment',
      align: 'center middle',
      backdrop: 'rgba(70, 69, 71, 0.2)',
      background: '#f5f5f5',
      height: 'auto',
      // width: '70%',
    }),
  )
  .addDecorator(withReadme(README))
  .add('default state', () => <Attachments attachmentService={attachmentService} />);
// .add('with text', () => <BigButton>Button title</BigButton>)
// .add('with roundedCorners & text', () => <BigButton roundedCorners>Button title</BigButton>)
// .add('colored', () => <BigButton color="organish">Button title</BigButton>)
// .add('disabled', () => <BigButton disabled>Button title</BigButton>)
// .add('with actions', () => <BigButton onClick={action('clicked')}>Button title</BigButton>)
// .add('disabled with actions', () => (
//   <BigButton disabled onClick={action('clicked')}>
//     Button title
//   </BigButton>
// ));
