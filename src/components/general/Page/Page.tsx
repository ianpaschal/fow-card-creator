import React from 'react';
import './Page.scss';
import classNames from 'classnames';
import { useWindowWidth } from '@react-hook/window-size';

export interface PageProps {
	toolbarItems?: React.ReactNode;
	children: React.ReactNode;
	className?: string;
}

// eslint-disable-next-line complexity
export const Page: React.FC<PageProps> = ({
	className: extraClassNames,
	toolbarItems,
	children,
}: PageProps) => {
	const windowWidth = useWindowWidth();
	const isMobile = windowWidth < 720;
	const showToolbar = toolbarItems || isMobile;
	return (
		<div className={classNames('page', !isMobile && 'page--desktop', showToolbar && 'page--toolbar')}>
			{showToolbar && (
				<div className={classNames(
					'page__toolbar',
					!isMobile && 'page__toolbar--desktop',
					showToolbar && 'page__toolbar--toolbar',
				)}>
					{toolbarItems}
				</div>
			)}
			<div className={classNames(
				'page__content',
				!isMobile && 'page__content--desktop',
				showToolbar && 'page__content--toolbar',
				extraClassNames,
			)}>
				{children}
			</div>
		</div>
	);
};
