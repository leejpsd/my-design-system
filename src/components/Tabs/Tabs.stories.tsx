import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';
import { Tabs } from './Tabs';

const meta: Meta = {
  title: 'Components/Tabs',
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <Tabs defaultValue="tab1">
      <Tabs.List>
        <Tabs.Trigger value="tab1">프로필</Tabs.Trigger>
        <Tabs.Trigger value="tab2">설정</Tabs.Trigger>
        <Tabs.Trigger value="tab3">알림</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="tab1">프로필 내용입니다.</Tabs.Content>
      <Tabs.Content value="tab2">설정 내용입니다.</Tabs.Content>
      <Tabs.Content value="tab3">알림 내용입니다.</Tabs.Content>
    </Tabs>
  ),
};

export const WithDisabledTab: Story = {
  render: () => (
    <Tabs defaultValue="tab1">
      <Tabs.List>
        <Tabs.Trigger value="tab1">활성</Tabs.Trigger>
        <Tabs.Trigger value="tab2" disabled>
          비활성
        </Tabs.Trigger>
        <Tabs.Trigger value="tab3">활성</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="tab1">첫 번째 탭</Tabs.Content>
      <Tabs.Content value="tab3">세 번째 탭</Tabs.Content>
    </Tabs>
  ),
};

// ===== Interaction Tests =====

export const TabSwitchTest: Story = {
  render: () => (
    <Tabs defaultValue="tab1">
      <Tabs.List>
        <Tabs.Trigger value="tab1">프로필</Tabs.Trigger>
        <Tabs.Trigger value="tab2">설정</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="tab1">프로필 내용</Tabs.Content>
      <Tabs.Content value="tab2">설정 내용</Tabs.Content>
    </Tabs>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // 초기: 프로필 탭 선택됨
    await expect(canvas.getByText('프로필 내용')).toBeInTheDocument();

    // 설정 탭 클릭
    await userEvent.click(canvas.getByRole('tab', { name: '설정' }));
    await expect(canvas.getByText('설정 내용')).toBeInTheDocument();
  },
};

export const KeyboardNavigation: Story = {
  render: () => (
    <Tabs defaultValue="tab1">
      <Tabs.List>
        <Tabs.Trigger value="tab1">첫째</Tabs.Trigger>
        <Tabs.Trigger value="tab2">둘째</Tabs.Trigger>
        <Tabs.Trigger value="tab3">셋째</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="tab1">첫 번째</Tabs.Content>
      <Tabs.Content value="tab2">두 번째</Tabs.Content>
      <Tabs.Content value="tab3">세 번째</Tabs.Content>
    </Tabs>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const firstTab = canvas.getByRole('tab', { name: '첫째' });

    // 첫째 탭에 포커스
    await userEvent.click(firstTab);
    await expect(firstTab).toHaveFocus();

    // 오른쪽 화살표로 둘째 이동
    await userEvent.keyboard('{ArrowRight}');
    const secondTab = canvas.getByRole('tab', { name: '둘째' });
    await expect(secondTab).toHaveFocus();
    await expect(canvas.getByText('두 번째')).toBeInTheDocument();

    // 오른쪽 화살표로 셋째 이동
    await userEvent.keyboard('{ArrowRight}');
    const thirdTab = canvas.getByRole('tab', { name: '셋째' });
    await expect(thirdTab).toHaveFocus();

    // 오른쪽 화살표 → 순환해서 첫째로
    await userEvent.keyboard('{ArrowRight}');
    await expect(firstTab).toHaveFocus();
  },
};

export const AriaAttributes: Story = {
  render: () => (
    <Tabs defaultValue="tab1">
      <Tabs.List>
        <Tabs.Trigger value="tab1">탭1</Tabs.Trigger>
        <Tabs.Trigger value="tab2">탭2</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="tab1">내용1</Tabs.Content>
      <Tabs.Content value="tab2">내용2</Tabs.Content>
    </Tabs>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // tablist role 확인
    const tablist = canvas.getByRole('tablist');
    await expect(tablist).toBeInTheDocument();

    // 선택된 탭의 aria-selected
    const tab1 = canvas.getByRole('tab', { name: '탭1' });
    await expect(tab1).toHaveAttribute('aria-selected', 'true');

    const tab2 = canvas.getByRole('tab', { name: '탭2' });
    await expect(tab2).toHaveAttribute('aria-selected', 'false');

    // tabpanel role 확인
    const panel = canvas.getByRole('tabpanel');
    await expect(panel).toBeInTheDocument();
  },
};
