import React from 'react';
import { shallow } from 'enzyme';
import ManifestDownloadLinks from '../src/ManifestDownloadLinks';

function createWrapper(props) {
  return shallow(
    <ManifestDownloadLinks
      renderings={[]}
      {...props}
    />,
  );
}

describe('ManifestDownloadLinks', () => {
  const renderings = [
    {
      id: 'http://example.com/abc123.pdf',
      getLabel: () => [{ value: 'Link to the PDF' }],
      getFormat: () => ({ value: 'application/pdf' }),
    },
    {
      id: 'http://example.com/abc123.txt',
      getLabel: () => [{ value: 'Link to the OCR' }],
      getFormat: () => ({ value: 'application/text' }),
    },
  ];

  it('renders the heading', () => {
    const wrapper = createWrapper({ renderings });

    expect(wrapper.find('WithStyles(Typography)[variant="h3"]').props().children).toEqual(
      'Other download options',
    );
  });

  it('renders a Link for each rendering', () => {
    const wrapper = createWrapper({ renderings });

    expect(wrapper.find('WithStyles(Link)').length).toBe(2);
  });

  it('links the label and includes the format (unlinked)', () => {
    const wrapper = createWrapper({ renderings });

    expect(wrapper.find('WithStyles(Link)').at(0).props().children).toEqual('Link to the PDF');
    expect(wrapper.find('WithStyles(Link)').at(0).props().href).toEqual('http://example.com/abc123.pdf');
    expect(wrapper.find('WithStyles(ListItemText)').at(0).props().children).toEqual('(application/pdf)');
  });
});