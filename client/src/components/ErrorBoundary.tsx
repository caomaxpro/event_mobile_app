import React from 'react';
import {View, Text} from 'react-native';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
}

class CalendarErrorBoundary extends React.Component<Props, State> {
  state: State = {hasError: false};

  static getDerivedStateFromError(_error: Error): State {
    return {hasError: true};
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error('Calendar Error:', error, errorInfo);
  }

  render(): React.ReactNode {
    if (this.state.hasError) {
      return (
        <View style={{padding: 20}}>
          <Text>Something went wrong with the calendar.</Text>
        </View>
      );
    }

    return this.props.children;
  }
}

export default CalendarErrorBoundary;
