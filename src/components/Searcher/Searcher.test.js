import React from 'react';
import Searcher from './Searcher.js';

import Adapter from 'enzyme-adapter-react-16';
import { mount, configure } from 'enzyme';

configure({adapter: new Adapter()});
let searcher;

test('testing Searcher', () => {
    searcher = mount(<Searcher />);
    let header = searcher.find('header');
    expect(header.length).toBe(1);

    let search = searcher.find('.searcher-bar');
    expect(search.length).toBe(1);
});