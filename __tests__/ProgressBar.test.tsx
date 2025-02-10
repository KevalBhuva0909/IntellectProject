import React from 'react';
import {render, act, waitFor} from '@testing-library/react-native';
import ProgressBar from '../src/components/ProgressBar';

describe('ProgressBar', () => {
  it('renders without crashing', () => {
    render(<ProgressBar progress={0} />);
  });

  it('handles progress values outside 0-100 gracefully', async () => {
    const {getByRole, update} = render(<ProgressBar progress={-20} />);
    const progressBar = getByRole('progressbar');

    await waitFor(() => expect(progressBar.props.style.width).toBe('0%'));

    await act(() => {
      update(<ProgressBar progress={150} />);
    });
    await waitFor(() => expect(progressBar.props.style.width).toBe('100%'));
  });

  it('animates progress changes', async () => {
    const {getByRole, update} = render(<ProgressBar progress={0} />);
    const progressBar = getByRole('progressbar');

    await waitFor(() => expect(progressBar.props.style.width).toBe('0%'));

    await act(() => {
      update(<ProgressBar progress={50} />);
    });
    await waitFor(() => expect(progressBar.props.style.width).toBe('50%'));

    await act(() => {
      update(<ProgressBar progress={100} />);
    });
    await waitFor(() => expect(progressBar.props.style.width).toBe('100%'));
  });

  it('displays the correct initial progress', async () => {
    const {getByRole} = render(<ProgressBar progress={25} />);
    const progressBar = getByRole('progressbar');

    await waitFor(() => expect(progressBar.props.style.width).toBe('25%'));
  });

  it('renders with different progress values', async () => {
    const {getByRole: getProgressBar1} = render(<ProgressBar progress={0} />);
    const progressBar1 = getProgressBar1('progressbar');
    await waitFor(() => expect(progressBar1.props.style.width).toBe('0%'));

    const {getByRole: getProgressBar2, update: update2} = render(
      <ProgressBar progress={50} />,
    );
    const progressBar2 = getProgressBar2('progressbar');
    await act(() => {
      update2(<ProgressBar progress={50} />);
    });
    await waitFor(() => expect(progressBar2.props.style.width).toBe('50%'));

    const {getByRole: getProgressBar3, update: update3} = render(
      <ProgressBar progress={100} />,
    );
    const progressBar3 = getProgressBar3('progressbar');
    await act(() => {
      update3(<ProgressBar progress={100} />);
    });
    await waitFor(() => expect(progressBar3.props.style.width).toBe('100%'));
  });

  it('updates aria-valuenow with progress', async () => {
    const {getByRole, update} = render(<ProgressBar progress={0} />);
    const progressBar = getByRole('progressbar');
    expect(progressBar.props['aria-valuenow']).toBe(0);

    await act(() => {
      update(<ProgressBar progress={50} />);
    });
    await waitFor(() => expect(progressBar.props['aria-valuenow']).toBe(50));

    await act(() => {
      update(<ProgressBar progress={100} />);
    });
    await waitFor(() => expect(progressBar.props['aria-valuenow']).toBe(100));
  });
});
