import { ReactNode } from 'react';

export interface ADrawerProps {
  /**
   * Whether the drawer is visible
   */
  visible: boolean;
  
  /**
   * Callback fired when the drawer requests to be closed
   */
  onClose: () => void;
  
  /**
   * Position of the drawer
   * @default 'right'
   */
  position?: 'left' | 'right' | 'top' | 'bottom';
  
  /**
   * Size of the drawer
   * For left/right: width
   * For top/bottom: height
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  
  /**
   * Header content
   */
  header?: ReactNode;
  
  /**
   * Main content
   */
  children: ReactNode;
  
  /**
   * Footer content
   */
  footer?: ReactNode;
  
  /**
   * Whether clicking the backdrop closes the drawer
   * @default true
   */
  dismissable?: boolean;
  
  /**
   * Whether pressing escape key closes the drawer
   * @default true
   */
  closeOnEscape?: boolean;
  
  /**
   * Show close button in header
   * @default true
   */
  showCloseButton?: boolean;
  
  /**
   * Custom CSS class for the drawer panel
   */
  className?: string;
  
  /**
   * Custom CSS class for the header
   */
  headerClassName?: string;
  
  /**
   * Custom CSS class for the content area
   */
  contentClassName?: string;
  
  /**
   * Custom CSS class for the footer
   */
  footerClassName?: string;
  
  /**
   * Custom CSS class for the backdrop
   */
  backdropClassName?: string;
  
  /**
   * Whether to block scroll on body when drawer is open
   * @default true
   */
  blockScroll?: boolean;
  
  /**
   * Whether to show backdrop overlay
   * @default true
   */
  showBackdrop?: boolean;
  
  /**
   * Z-index for the drawer
   * @default 1000
   */
  zIndex?: number;
}
