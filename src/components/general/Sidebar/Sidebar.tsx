import React from 'react';
import { Transition } from 'react-transition-group';
import { Button } from 'primereact/button';
import './Sidebar.scss';
import classNames from 'classnames';

const duration = 100;
const sidebarStyle = {
	transition: `width ${duration}ms`,
};
const sidebarTransitionStyles = {
	entering: { width: 0 },
	entered: { width: '224px' },
	exiting: { width: '224px' },
	exited: { width: 0 },
};

const backdropStyle = {
	transition: `opacity ${duration}ms`,
};
const backdropTransitionStyles = {
	entering: { opacity: 0, visibility: 'hidden' },
	entered: { opacity: 1, visibility: 'visible' },
	exiting: { opacity: 1, visibility: 'visible' },
	exited: { opacity: 0, visibility: 'hidden' },
};

export interface SidebarProps {
	isOpen: boolean;
	isMobile?: boolean;
	children: React.ReactNode;
	onToggle: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
	isOpen,
	isMobile,
	children,
	onToggle,
}: SidebarProps) => {
	return (
		<>
			{isMobile && (
				<>
					<div className="sidebar__toggle-button">
						<Button
							icon={classNames('pi', isOpen ? 'pi-times' : 'pi-bars')}
							onClick={onToggle}
						/>
					</div>
					<Transition in={isOpen} timeout={duration}>
						{(state) => (
							<div
								className="sidebar__backdrop" style={{
									...backdropStyle,
									...backdropTransitionStyles[ state ],
								}}
								onClick={onToggle}
							/>
						)}
					</Transition>
				</>
			)}
			<Transition in={isOpen} timeout={duration}>
				{(state) => (
					<div className={classNames('sidebar', isMobile && 'sidebar--mobile')} style={{
						...sidebarStyle,
						...sidebarTransitionStyles[ state ],
					}}>
						<div className="sidebar__children">
							{children}
						</div>
					</div>
				)}
			</Transition>
		</>
	);
};
